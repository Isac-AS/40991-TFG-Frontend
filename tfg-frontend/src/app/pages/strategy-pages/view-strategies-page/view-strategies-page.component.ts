import { Component } from '@angular/core';
import { Strategy } from 'src/app/models/strategy.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-view-strategies-page',
  templateUrl: './view-strategies-page.component.html',
  styleUrls: ['./view-strategies-page.component.scss']
})
export class ViewStrategiesPageComponent {

  debug: boolean = false;

  selectedStrategy: Strategy = {
    name: "",
    description: "",
    python_file_path: "",
    env_path: "",
    input_type: "",
    output_type: "",
    stage: "",

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
      currentPageName: 'Ver Estrategias'
    })
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

  updateSelectedStrategy(strategy: any) {
    this.selectedStrategy = strategy;
  }

}
