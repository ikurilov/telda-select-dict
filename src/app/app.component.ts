import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedItem = null;

  onSelect() {
    alert('Hey!');
  }

  changeSelectedItem() {
    this.selectedItem = {
      id: 0,
      nameM: 'CHANGED!!'
    };
  }

  changed(item) {
    console.log(item);
  }
}
