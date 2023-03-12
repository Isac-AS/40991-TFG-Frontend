import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-new-strategy-page',
  templateUrl: './new-strategy-page.component.html',
  styleUrls: ['./new-strategy-page.component.scss']
})
export class NewStrategyPageComponent implements OnInit {

  constructor(
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Nueva Estrategia'
    })
   }

  ngOnInit() {
  }

}
