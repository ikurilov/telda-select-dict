import {
  Component, ContentChild, ElementRef, forwardRef, HostListener, Input, OnInit, ViewChild
} from '@angular/core';
import {findIndex} from 'lodash/array';
import {find} from 'lodash/collection';
import {cloneDeep} from 'lodash/lang';
import {assign} from 'lodash/object'

import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'
import {SelectDictChoicesComponent} from './select-dict-choices/select-dict-choices.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectDictPipe} from './select-dict.pipe';
import {Subscription} from 'rxjs/Subscription';

interface IDictListContainer {
  total: number;
  size: number;
  list: any[]
}

@Component({
  selector: 'app-select-dict',
  templateUrl: './select-dict.component.html',
  styleUrls: ['./select-dict.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDictComponent),
      multi: true
    }
  ]
})
export class SelectDictComponent implements OnInit, ControlValueAccessor {
  @Input() selected;
  @Input() url;
  @Input() indexBy = 'id';
  @Input() filterBy = 'name';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() options;

  dictFilter = new SelectDictPipe();

  focusMatch = new Subject();
  focusSearch = new Subject();

  items: any[] = [];
  _items: any[] = [];

  search: string;
  active = null;
  activeIndex: 'nextPage' | 'prevPage' | number = -1;

  initialQuery = true;
  longList = false;
  listSize = 50;
  page = 0;
  allInMemory = false;
  lastRemoteSearch: string;

  opened = false;

  propagateChange = (_: any) => {
  };

  @ContentChild('selectMatch') matchTemplate;
  @ContentChild('selectChoices') choicesTemplate;

  @ViewChild(SelectDictChoicesComponent) choicesComponent: SelectDictChoicesComponent;

  @HostListener('document:click', ['$event'])
  clickHandler(event) {
    let selectDictContainer = this.eRef.nativeElement.querySelector('.select-dict');
    if (!selectDictContainer.contains(event.target) && this.opened) {
      this.onClose();
    }
  }

  constructor(private eRef: ElementRef, private http: Http) {
  }

  ngOnInit() {

  }

  onSelect($event) {
    this.selected = $event.item;
    this.propagateChange(this.selected);
    this.onClose();
  }

  onOpen($event?) {
    this.opened = true;
    this.active = this.selected;
    this.request();
  }

  onClose() {
    this.opened = false;
    this.resetComponent();
  }

  resetComponent() {
    this.items = [];
    this.active = null;
    this.activeIndex = -1;
    this.page = 0;
    this.search = '';
    this.focusMatch.next();
  }

  onClear() {

  }

  onSearch(value: string) {
    if (this.search !== value) {
      this.search = value;
      this.searchItem();
    }
  }

  searchItem() {
    this.page = 0;
    if (this.needToLoadData()) this.request();
    else {
      this.items = this.dictFilter.transform(this._items, this.filterBy, this.search);
      if (this.active) {
        this.activeIndex = this.getActiveIndex();
      }
      else {
        this.activeIndex = -1;
      }
    }
  }

  selectHighlighted() {
    if (this.activeIndex === 'prevPage') {
      this.getPrevPage();
    }
    else if (this.activeIndex === 'nextPage') {
      this.getNextPage();
    }
    else {
      this.onSelect({$event: null, item: this.active});
    }
  }

  activateNext() {
    this.setActiveItem('next');
  }

  activatePrev() {
    this.setActiveItem('prev');
  }

  request(): Subscription {
    let params = {
      [this.filterBy]: this.search,
      count: this.listSize,
      from: this.page * this.listSize
    };

    assign(params, this.options);

    return this.http.get(this.url, {withCredentials: true, params})
      .map(result => result.json())
      .subscribe((container: IDictListContainer) => {
        if (this.initialQuery) {
          this.initialQuery = false;
          this.longList = container.total < 0 || container.total > container.size;
        }
        this._items = container.list;
        this.items = cloneDeep(this._items);

        this.lastRemoteSearch = <string>params[this.filterBy];
        this.allInMemory = this.page === 0 && container.size < this.listSize;

        this.activeIndex = this.active ? this.getActiveIndex() : -1;

        this.choicesComponent.scrollToTop();
        this.choicesComponent._ensureHighlightVisible();
      });


  }

  getNextPage() {
    this.page++;
    this.focusSearch.next();
    this.request();
  }

  getPrevPage() {
    this.page--;
    this.focusSearch.next();
    this.request();
  }

  setActiveItem(direction: ('next' | 'prev')) {
    let itemsLength = this.items.length;
    if (this.activeIndex === -1) {
      if (this.longList && this.page !== 0) {
        this.activeIndex = 'prevPage';
      }
      else if (itemsLength) {
        this.activeIndex = 0;
      }
    }
    else {
      // previous item
      if (direction === 'prev') {
        if (typeof this.activeIndex !== 'string') {
          if (this.activeIndex !== 0) {
            this.activeIndex--;
          }
          else if (this.longList && this.page !== 0) {
            this.activeIndex = 'prevPage';
          }
        }
        else if (this.activeIndex === 'nextPage') {
          this.activeIndex = itemsLength - 1;
        }
      }
      // next item
      else {
        if (typeof this.activeIndex !== 'string') {
          if (this.activeIndex !== itemsLength - 1) {
            this.activeIndex++;
          }
          // if next button available
          else if (this.longList && !(itemsLength < this.listSize)) {
            this.activeIndex = 'nextPage';
          }
        }
        else if (this.activeIndex === 'prevPage') {
          this.activeIndex = 0;
        }
      }
    }

    this.active = this.activeIndex !== -1 && typeof this.activeIndex !== 'string' ? this.items[this.activeIndex] : null;
  }

  getActiveIndex() {
    return findIndex(this.items, item => item[this.indexBy] === this.active[this.indexBy]);
  }

  writeValue(value: any) {
    this.selected = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  needToLoadData() {
    if (this.longList) {
      return !this.allInMemory || this.search.indexOf(this.lastRemoteSearch) === -1
    }
    return false;
  };
}