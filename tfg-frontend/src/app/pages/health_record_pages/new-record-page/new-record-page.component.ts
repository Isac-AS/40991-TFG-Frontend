import { Component } from '@angular/core';
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
  pipelineId: any = 1;
  pipelineName: any;

  constructor(
    public globalService: GlobalService,
    private ehrAPIService: HeathRecordAPIService,
    private fileService: FileAPIService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Nuevo registro'
    })
  }

  updateTeste(teste: any) {
    this.teste = teste;
    console.log("TESTE in parent: ", this.teste)
  }

  updateSelectedPipeline(pipeline: any) {
    this.pipelineId = pipeline.id;
    this.pipelineName = pipeline.name;
    console.log("pipeline received in parent: ", pipeline)
  }

  createRecord() {
    let formData = new FormData();
    formData.append('audio', this.teste.blob, this.teste.title)
    // First upload file
    this.fileService.uploadFile('/health_records/save_audio', formData).subscribe({
      // Then create record
      next: audio_saving_response => {
        this.ehrAPIService.createRecordFromAudio(audio_saving_response.audio_file_path, this.pipelineId).subscribe(
          health_record_response => {
            console.log(health_record_response)
          }
        )
      }
    })
  }
}
