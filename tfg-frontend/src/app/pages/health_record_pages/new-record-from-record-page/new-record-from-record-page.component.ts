import { Component } from '@angular/core';
import { HealthRecord } from 'src/app/models/health-record.model';
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
  createdRecord: any;
  processingSteps: any;

  debug: boolean = false;

  constructor(
    public globalService: GlobalService,
    private ehrAPIService: HeathRecordAPIService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Nuevo registro a partir de otro registro'
    })
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

  updateSelectedRecord(record: any) {
    this.selectedRecord = record;
    if (this.debug) {
      console.log("[DEBUG] - [NEW-RECORD-FROM-RECORD-PAGE]: Record recieved in parent:");
      console.log(record);
      console.log("*---*");
    }
  }

  updateSelectedPipeline(pipeline: any) {
    this.selectedPipeline = pipeline;
    if (this.debug) {
      console.log("[DEBUG] - [NEW-RECORD-FROM-RECORD-PAGE]: Pipeline recieved in parent:");
      console.log(pipeline);
      console.log("*---*");
    }
  }

  updateNewRecordInput(strategyInput: any) {
    this.strategyInput = strategyInput;
    if (this.debug) {
      console.log("[DEBUG] - [NEW-RECORD-FROM-RECORD-PAGE]: Strategy Input recieved in parent:");
      console.log(strategyInput);
      console.log("*---*");
    }
  }

  updateNewStage(pipelineStage: any) {
    this.pipelineStage = pipelineStage;
    this.processingSteps = this.selectedPipeline.strategies.slice(pipelineStage);
    if (this.debug) {
      console.log("[DEBUG] - [NEW-RECORD-FROM-RECORD-PAGE]: Pipeline Stage Recieved in parent:");
      console.log(pipelineStage);
      console.log("*---*");
    }
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
        if (this.debug) {
          console.log("[DEBUG] - [NEW-RECORD-FROM-RECORD-PAGE]: Record creation response:");
          console.log(health_record_response)
          console.log("*---*");
        }
        if (health_record_response.result == true) {
          this.isFinished = true
        }
        this.isProcessing = false;
        this.createdRecord = health_record_response.healthRecord;
      }
    })
  }
}
