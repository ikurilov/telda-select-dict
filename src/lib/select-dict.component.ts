import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {findIndex} from 'lodash/array';
import {cloneDeep} from 'lodash/lang';
import {assign} from 'lodash/object'

import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'
import {SelectDictChoicesComponent} from './select-dict-choices/select-dict-choices.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectDictPipe} from './select-dict.pipe';
import {Subscription} from 'rxjs/Subscription';
import {SelectDictService} from './select-dict.service';

export interface IDictListContainer {
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectDictComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() selected;
  @Input() url;
  @Input() indexBy = 'id';
  @Input() filterBy = 'name';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() options;
  @Input() size: 'sm' | null;
  @Input() disabled = false;

  @Output() update = new EventEmitter();

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

  selectDictContainerElement;

  propagateChange = (_: any) => {
  };

  @ContentChild('selectMatch') matchTemplate;
  @ContentChild('selectChoices') choicesTemplate;

  @ViewChild(SelectDictChoicesComponent) choicesComponent: SelectDictChoicesComponent;

  @HostListener('document:click', ['$event'])
  outsideClickHandler(event) {
    if (this.opened) {
      if (!this.selectDictContainerElement.contains(event.target) && this.opened) {
        this.closeChoices();
      }
    }
  }

  constructor(private eRef: ElementRef, private dictService: SelectDictService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.selectDictContainerElement = this.eRef.nativeElement.querySelector('.select-dict');
  }

  onSelect($event) {
    this.selected = $event.item;
    this.propagateChange($event.item);
    this.update.emit($event.item);
    this.closeChoices();
  }

  onOpen($event?) {
    if (!this.disabled) {
      this.opened = true;
      this.active = this.selected;
      this.focusSearch.next();
      this.request();
    }
  }

  closeChoices() {
    this.opened = false;
    this.resetComponent();
    this.focusMatch.next();
  }

  resetComponent() {
    this.items = [];
    this.active = null;
    this.activeIndex = -1;
    this.page = 0;
    this.search = '';
  }

  /*TODO create this functionality*/
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
      [this.filterBy]: this.search ? this.search : '',
      count: this.listSize,
      from: this.page * this.listSize
    };

    assign(params, this.options);

    return this.dictService.getPage(this.url, params)
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

        this.cdr.markForCheck();
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
    this.cdr.markForCheck();
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
