import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { HeathRecordAPIService } from 'src/app/services/health-record-api.service';

@Component({
  selector: 'app-new-record-from-record-page',
  templateUrl: './new-record-from-record-page.component.html',
  styleUrls: ['./new-record-from-record-page.component.scss']
})
export class NewRecordFromRecordPageComponent {

  selectedRecord: any = "";
  selectedPipeline: any = "";
  strategyInput: any;
  pipelineStage: any;
  pipelineName: any;
  isProcessing: boolean = false;
  isFinished: boolean = false;

  constructor(
    public globalService: GlobalService,
    private ehrAPIService: HeathRecordAPIService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Nuevo registro a partir de otro registro'
    })
  }

  updateSelectedRecord(record: any) {
    this.selectedRecord = record;
    console.log("record received in parent: ", record)
  }

  updateSelectedPipeline(pipeline: any) {
    this.selectedPipeline = pipeline;
    console.log("pipeline received in parent: ", pipeline)
  }
  
  updateNewRecordInput(strategyInput: any) {
    this.strategyInput = strategyInput;
    console.log("new input received in parent: ", strategyInput)
  }

  updateNewStage(pipelineStage: any) {
    this.pipelineStage = pipelineStage;
    console.log("new pipeline stage in parent: ", pipelineStage)
  }

  createRecord() {
    this.isProcessing = true;
    this.ehrAPIService.createRecordFromRecord(
      this.selectedRecord.id,
      this.selectedRecord.recording_path,
      this.selectedRecord.transcription,
      this.strategyInput,
      this.selectedPipeline.id,
      this.pipelineStage
    ).subscribe({
      next: (health_record_response) => {
        console.log(health_record_response)
        if (health_record_response.result == true) {
          this.isFinished = true
        }
        this.isProcessing = false;
      }
    })
  }
}
