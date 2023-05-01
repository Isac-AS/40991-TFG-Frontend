import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HealthRecord } from 'src/app/models/health-record.model';
import { GlobalService } from 'src/app/services/global.service';
import { HeathRecordAPIService } from 'src/app/services/health-record-api.service';

@Component({
  selector: 'app-modify-ehr',
  templateUrl: './modify-ehr.component.html',
  styleUrls: ['./modify-ehr.component.scss']
})
export class ModifyEhrComponent implements OnChanges {
  
  debug: boolean = false;

  @Input() selectedRecord!: HealthRecord;
  @Output() updatedRecordEmmiter: any = new EventEmitter<any>()
  
  ehrForm = this.fb.group({
    ehr: ["", Validators.required],
    transcription: ["", [Validators.required]],
  })
  
  usageStage: "1" | "2" | "3" = "1";
  result: boolean = false;
  backendErrorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private recordAPIService: HeathRecordAPIService,
    public globalService: GlobalService
  ) {
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.debug) {
      console.log("[DEBUG] - [MODIFY-EHR-COMPONENT]: Detected changes:");
      console.log(changes);
      console.log("*---*");
    }
    let updatedRecord = changes['selectedRecord'].currentValue;
    if (this.selectedRecord.health_record != updatedRecord.health_record && this.selectedRecord.transcription != updatedRecord.transcription){
      this.usageStage = "1";
    }
    this.selectedRecord = changes['selectedRecord'].currentValue;
    let segments = this.selectedRecord.health_record.split("\r");
    let ehrString = segments.join("\n");
    this.updateFormValue(ehrString, this.selectedRecord.transcription);
  }

  updateFormValue(ehrString: string, transcription: string) {
    this.ehrForm.setValue({
      ehr: ehrString,
      transcription: transcription
    });
  }
  
  getEhrDBValue(message: string) {
    let segments = message.split("\n");
    return segments.join("\r");
  }

  modifyRecord() {
    this.selectedRecord.health_record = this.getEhrDBValue(this.ehrForm.value.ehr!);
    this.selectedRecord.transcription = this.ehrForm.value.transcription!;
    this.usageStage = '2';
    this.recordAPIService.updateHealthRecord(this.selectedRecord).subscribe({
      next: res => {
        if (this.debug) {
          console.log("[DEBUG] - [MODIFY-EHR-COMPONENT]: Modification attempt response:");
          console.log(res);
          console.log("*---*");
        }
        this.usageStage = '3';
        this.result = res.result;
        if (res.result) {
          this.updatedRecordEmmiter.emit(res.healthRecord);
        } else {
          this.backendErrorMessage = res.message;
        }
      }
    })
  }
}