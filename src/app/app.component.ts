import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedItem = {
    "id": 23618,
    "name": "\"Дорожник\" сад.",
    "municipality": {
      "id": 23399,
      "sortedName": "Садоводческий массив",
      "nameM": "Садоводческий массив",
      "type": {"id": 4, "name": "массив"},
      "district": {"id": 2, "name": "Волосовский"},
      "primaryElemName": null,
      "primaryElemAbbrev": null,
      "primaryElemList": null,
      "primaryElemNotes": null,
      "s": 0,
      "nameP": "Садоводческий массив",
      "nameN": "Садоводческий массив",
      "moId": null
    },
    "directionEntity": null,
    "type": {"id": 6, "name": "садоводство"},
    "nameM": "сад.\"Дорожник\"",
    "nameP": "сад.\"Дорожник\"",
    "nameN": "\"Дорожник\" сад.",
    "sk": null
  };
}
