import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-strategy-guide-page',
  templateUrl: './strategy-guide-page.component.html',
  styleUrls: ['./strategy-guide-page.component.scss']
})
export class StrategyGuidePageComponent  {

  constructor(
    public globalService: GlobalService,
  ) { 
    this.globalService.pageName.next({
      currentPageName: 'Documentación > Guías > Estrategias'
    })
  }
}
