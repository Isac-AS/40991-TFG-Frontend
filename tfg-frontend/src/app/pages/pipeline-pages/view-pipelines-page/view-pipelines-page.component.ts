import { Component } from '@angular/core';
import { Pipeline } from 'src/app/models/pipeline.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-view-pipelines-page',
  templateUrl: './view-pipelines-page.component.html',
  styleUrls: ['./view-pipelines-page.component.scss']
})
export class ViewPipelinesPageComponent {

  debug: boolean = false;

  selectedPipeline: Pipeline = {
    name: "",
    description: "",
    strategies: [],

    id: -1,
    updated_at: '',
    created_at: '',
    created_by: '',
    last_modified_by: '',
  }

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

  updateSelectedPipeline(pipeline: any) {
    this.selectedPipeline = pipeline;
  }

}
