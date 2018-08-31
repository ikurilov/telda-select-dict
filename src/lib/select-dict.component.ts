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

import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {SelectDictChoicesComponent} from './select-dict-choices/select-dict-choices.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectDictService} from './select-dict.service';
import 'rxjs/operators/throttleTime'
import 'rxjs/add/operator/throttleTime';

export interface IDictListContainer {
  total: number;
  size: number;
  list: any[];
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
  @Input() dropdownPosition: string;
  @Input() showCloseBtn = true;

  @Output() update = new EventEmitter();

  focusMatch = new Subject();
  focusSearch = new Subject();

  items: any[] = [];
  active = null;

  search: string;

  listSize = 50;
  page = 0;
  endOfList = false;
  loading = false;

  opened = false;

  selectDictContainerElement;

  highlightElement = new Subject<'next' | 'prev'>();

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
    this.highlightElement.throttleTime(50).subscribe(direction => {
      this.highlightItem(direction);
    })
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

  onOpen() {
    if (!this.disabled) {
      this.opened = true;
      this.active = this.selected;
      this.focusSearch.next();
    }
  }

  closeChoices() {
    this.opened = false;
    this.focusMatch.next();
    this.resetComponent();
  }

  resetComponent() {
    this.items = [];
    this.active = null;
    this.endOfList = false;
    this.page = 0;
    this.search = '';
  }

  onClear() {
    this.propagateChange(this.selected = null);
  }

  onSearch(event) {
    this.search = event;
    this.page = 0;
    this.request().subscribe(data => {
      this.items = data;
      this.choicesComponent.scrollToIndex(0);
    });
  }

  selectHighlighted() {
    this.onSelect({$event: null, item: this.active});
  }

  highlight(direction: 'prev' | 'next') {
    this.highlightElement.next(direction);
  }

  request() {
    let params = {
      [this.filterBy]: this.search ? this.search : '',
      count: this.listSize,
      from: this.page * this.listSize,
      ...this.options
    };

    return this.dictService.getPage(this.url, params).map((container: IDictListContainer) => {
      this.endOfList = container.size < this.listSize;
      this.page++;
      this.cdr.markForCheck();
      return container.list;
    });
  }

  getNextChunk() {
    if (this.endOfList) return;
    this.loading = true;
    this.request().subscribe(data => {
      this.loading = false;
      this.items = this.items.concat(data);
    });
  }

  highlightItem(direction: ('next' | 'prev')) {
    let activeIdx = 0;
    if (this.active) {
      activeIdx = this.items.findIndex(item => item.id === this.active.id);
      direction === 'next' ? activeIdx++ : activeIdx--;
      if (activeIdx < 0) activeIdx = 0;
      if (activeIdx > this.items.length - 1) activeIdx = this.items.length - 1;
    }
    this.active = this.items[activeIdx];
    this.choicesComponent.scrollToIndex(activeIdx);
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
}
