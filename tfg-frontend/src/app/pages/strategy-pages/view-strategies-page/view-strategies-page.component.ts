import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-view-strategies-page',
  templateUrl: './view-strategies-page.component.html',
  styleUrls: ['./view-strategies-page.component.scss']
})
export class ViewStrategiesPageComponent {

  debug: boolean = false;

  constructor(
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Ver Estrategias'
    })
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

}
