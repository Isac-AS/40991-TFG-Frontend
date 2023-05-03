import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-pipeline-guide-page',
  templateUrl: './pipeline-guide-page.component.html',
  styleUrls: ['./pipeline-guide-page.component.scss']
})
export class PipelineGuidePageComponent {

  constructor(
    public globalService: GlobalService,
  ) { 
    this.globalService.pageName.next({
      currentPageName: 'Documentación > Guías > Pipelines'
    })
  }

}
