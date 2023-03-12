import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-view-strategies-page',
  templateUrl: './view-strategies-page.component.html',
  styleUrls: ['./view-strategies-page.component.scss']
})
export class ViewStrategiesPageComponent implements OnInit {

  constructor(
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Ver Estrategias'
    })
   }

  ngOnInit() {
  }

}
