import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-records-guide-page',
  templateUrl: './records-guide-page.component.html',
  styleUrls: ['./records-guide-page.component.scss']
})
export class RecordsGuidePageComponent {

  constructor(
    public globalService: GlobalService,
  ) { 
    this.globalService.pageName.next({
      currentPageName: 'Documentación > Guías > Registros'
    })
  }

}
