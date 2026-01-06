import { Component, OnInit } from '@angular/core';
import { Badge } from '@awesome-cordova-plugins/badge/ngx';


@Component({
  selector: 'app-cerita-home',
  templateUrl: './cerita-home.page.html',
  styleUrls: ['./cerita-home.page.scss'],
})
export class CeritaHomePage implements OnInit {

  constructor(private badge: Badge) { }

  ngOnInit() {
    this.badge.set(10);
  }

}
