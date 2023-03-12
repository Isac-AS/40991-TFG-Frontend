import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-new-pipeline-page',
  templateUrl: './new-pipeline-page.component.html',
  styleUrls: ['./new-pipeline-page.component.scss']
})
export class NewPipelinePageComponent{

  constructor(
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Nuevo Pipeline'
    })
   }


}
