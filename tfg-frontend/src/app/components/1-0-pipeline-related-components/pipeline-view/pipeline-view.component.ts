import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pipeline } from 'src/app/models/pipeline.model';

@Component({
  selector: 'app-pipeline-view',
  templateUrl: './pipeline-view.component.html',
  styleUrls: ['./pipeline-view.component.scss']
})
export class PipelineViewComponent implements OnChanges {

  @Input() selectedPipeline!: Pipeline;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedPipeline: Pipeline = changes['selectedPipeline'].currentValue;
    if (updatedPipeline.id != -1) {
      this.selectedPipeline = updatedPipeline;
    }
  }

}
