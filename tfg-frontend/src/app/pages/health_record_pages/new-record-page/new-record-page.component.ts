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

  createRecord() {
    let formData = new FormData();
    formData.append('audio', this.teste.blob, this.teste.title)
    this.fileService.uploadFile('/health_records/save_audio', formData).subscribe({
      next: audio_saving_response => {
        this.ehrAPIService.createRecordFromAudio(audio_saving_response.audio_file_path, 0).subscribe(
          health_record_response => {
            console.log(health_record_response)
          }
        )
      }
    })
  }
}
