import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-important-code-page',
  templateUrl: './important-code-page.component.html',
  styleUrls: ['./important-code-page.component.scss']
})
export class ImportantCodePageComponent {

  constructor(
    public globalService: GlobalService,
  ) { 
    this.globalService.pageName.next({
      currentPageName: 'Documentación > Aspectos destacables del código'
    })
  }

}
