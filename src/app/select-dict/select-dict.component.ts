import {
  Component, ContentChild, ContentChildren, ElementRef, HostListener, Input, OnInit,
  TemplateRef
} from '@angular/core';

import {findIndex} from 'lodash/array';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

interface IDictListContainer {
  total: number;
  size: number;
  list: any[]
}

const KEY_CODES = {
  DOWN: 40,
  UP: 38,
  ENTER: 13
};

@Component({
  selector: 'app-select-dict',
  templateUrl: './select-dict.component.html',
  styleUrls: ['./select-dict.component.less']
})
export class SelectDictComponent implements OnInit {
  @Input() selected;
  @Input() url;
  focusMatch = new Subject();

  items: any[];
  search: string;
  active = null;
  activeIndex = -1;

  indexByProperty = 'id';

  opened = false;

  @ContentChild('selectMatch') matchTemplate;
  @ContentChild('selectChoices') choicesTemplate;

  @HostListener('document:click', ['$event'])
  clickHandler(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.opened = false;
    }
  }

  constructor(private eRef: ElementRef, private http: Http) {

  }

  ngOnInit() {
    this.request();
  }

  onSelect($event) {
    console.log('select');
    this.selected = $event.item;
    this.active = $event.item;
    this.opened = false;
    this.onClose();
  }

  onOpen($event?) {
    console.log('open');
    this.opened = !this.opened;
    this.active = this.selected;
    this.onClose();
  }

  onClose() {
    this.focusMatch.next();
  }

  onClear() {

  }

  onSearch() {

  }

  onMatchKeyPress($event: KeyboardEvent) {
    if ($event.keyCode === KEY_CODES.ENTER) {
      this.onOpen();
    }
  }

  onSearchKeyPress($event: KeyboardEvent) {
    switch ($event.keyCode) {
      case KEY_CODES.UP: {
        this.highLightItem('prev');
        break;
      }
      case KEY_CODES.DOWN: {
        this.highLightItem('next');
        break;
      }
      case KEY_CODES.ENTER: {
        this.onSelect({$event: null, item: this.active});
        break;
      }
    }
  }

  highLightItem(direction: ('next' | 'prev')) {
    if (!this.items) {
      return;
    }
    let itemsLength = this.items.length;
    if (this.activeIndex === -1) {
      if (itemsLength) {
        this.active = this.items[0];
        this.activeIndex = 0;
      }
    }
    else {
      this.activeIndex = this.getActiveIndex();
      if (this.activeIndex !== -1) {
        if (direction === 'next' && this.activeIndex !== itemsLength - 1)
          this.active = this.items[this.activeIndex + 1];
        else if (direction === 'prev' && this.activeIndex !== 0)
          this.active = this.items[this.activeIndex - 1];
      }
    }
  }

  getActiveIndex() {
    return findIndex(this.items, (item) => item[this.indexByProperty] === this.active[this.indexByProperty]);
  }

  request() {
    this.http.get(this.url, {withCredentials: true}).map(result => result.json()).subscribe((container: IDictListContainer) => {
      this.items = container.list;
    })
  }
}
