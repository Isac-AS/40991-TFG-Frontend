import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-new-strategy-page',
  templateUrl: './new-strategy-page.component.html',
  styleUrls: ['./new-strategy-page.component.scss']
})
export class NewStrategyPageComponent {

  debug: boolean = false;

  constructor(
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Nueva Estrategia'
    })
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

}
