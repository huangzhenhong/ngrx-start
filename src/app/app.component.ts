import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyA1t0gJZ0adWPUfE2yc6MD4XUsHuacVGm4",
      authDomain: "recipebook-9f375.firebaseio.com"
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
