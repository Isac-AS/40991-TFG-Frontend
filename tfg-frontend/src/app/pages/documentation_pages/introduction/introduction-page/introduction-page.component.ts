import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-introduction-page',
  templateUrl: './introduction-page.component.html',
  styleUrls: ['./introduction-page.component.scss']
})
export class IntroductionPageComponent {

  constructor(
    public globalService: GlobalService,
  ) { 
    this.globalService.pageName.next({
      currentPageName: 'Documentación > Introducción'
    })
  }

}
