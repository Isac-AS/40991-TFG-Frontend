import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-view-pipelines-page',
  templateUrl: './view-pipelines-page.component.html',
  styleUrls: ['./view-pipelines-page.component.scss']
})
export class ViewPipelinesPageComponent {

  debug: boolean = false;

  constructor(
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Ver Pipelines'
    })
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

}
