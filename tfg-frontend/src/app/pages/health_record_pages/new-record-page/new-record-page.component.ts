import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HealthRecord } from 'src/app/models/health-record.model';
import { FileAPIService } from 'src/app/services/file.service';
import { GlobalService } from 'src/app/services/global.service';
import { HeathRecordAPIService } from 'src/app/services/health-record-api.service';

@Component({
  selector: 'app-new-record-page',
  templateUrl: './new-record-page.component.html',
  styleUrls: ['./new-record-page.component.scss']
})
export class NewRecordPageComponent {

  teste: any;
  blobURL: any;
  blob: any;

  pipelineId: any = 1;
  pipelineName: any;
  pipeline: any;

  isProcessing: boolean = false;
  isFinished: boolean = false;
  createdRecord: HealthRecord = {
    recording_path: '',
    transcription: '',
    health_record: '',
    processing_outputs: [],

    id: -1,
    updated_at: '',
    created_at: '',
    created_by: '',
    last_modified_by: '',
  }

  debug: boolean = false;

  constructor(
    public globalService: GlobalService,
    private ehrAPIService: HeathRecordAPIService,
    private fileService: FileAPIService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Nuevo registro de audio'
    })
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

  updateTeste(teste: any) {
    this.blobURL = null;
    this.teste = teste;
    this.blob = this.teste.blob
    this.blobURL = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(teste.blob)
    );
    this.cdRef.detectChanges();
    if (this.debug) {
      console.log("[DEBUG] - [NEW-RECORD-PAGE]: TESTE recieved from AUDIO-RECORDER-COMPONENT:");
      console.log(this.teste)
      console.log("*---*");
    }
  }

  updateSelectedPipeline(pipeline: any) {
    this.pipelineId = pipeline.id;
    this.pipelineName = pipeline.name;
    this.pipeline = pipeline;
    if (this.debug) {
      console.log("[DEBUG] - [NEW-RECORD-PAGE]: Pipeline recieved from PIPELINE-TABLE-COMPONENT:");
      console.log(pipeline);
      console.log("*---*");
    }
  }

  createRecord() {
    let formData = new FormData();
    formData.append('audio', this.teste.blob, this.teste.title)
    // First upload file
    this.fileService.uploadFile('/health_records/save_audio', formData).subscribe({
      // Then create record
      next: audio_saving_response => {
        this.isProcessing = true;
        this.ehrAPIService.createRecordFromAudio(audio_saving_response.audio_file_path, this.pipelineId).subscribe({
          next: (health_record_response) => {
            if (this.debug) {
              console.log("[DEBUG] - [NEW-RECORD-PAGE]: Health Record Creation response:");
              console.log(health_record_response)
              console.log("*---*");
            }
            if (health_record_response.result == true) {
              this.isFinished = true
            }
            this.isProcessing = false;
            this.createdRecord = health_record_response.healthRecord
          }
        })
      }
    })
  }
}
