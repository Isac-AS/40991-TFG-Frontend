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
  }

  updateTeste(teste: any) {
    this.blobURL = null;
    this.teste = teste;
    this.blobURL = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(teste.blob)
    );
    this.cdRef.detectChanges();
    console.log("TESTE in parent: ", this.teste)
  }

  updateSelectedPipeline(pipeline: any) {
    this.pipelineId = pipeline.id;
    this.pipelineName = pipeline.name;
    this.pipeline = pipeline;
    console.log("pipeline received in parent: ", pipeline)
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
            console.log(health_record_response)
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
