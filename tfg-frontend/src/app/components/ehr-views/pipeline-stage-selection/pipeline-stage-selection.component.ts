import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pipeline } from 'src/app/models/pipeline.model';

@Component({
  selector: 'app-pipeline-stage-selection',
  templateUrl: './pipeline-stage-selection.component.html',
  styleUrls: ['./pipeline-stage-selection.component.scss']
})
export class PipelineStageSelectionComponent{

  @Input() selectedPipeline!: Pipeline;
  @Output() selectedStageEmitter:any = new EventEmitter<any>()

  constructor() { }

  emitNewStage(value: any) {
    this.selectedStageEmitter.emit(value)
  }

}
