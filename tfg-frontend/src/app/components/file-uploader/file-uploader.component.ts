import { Component, EventEmitter, Output } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  @Output() fileEmitter: any = new EventEmitter<any>()
  @Output() fileNameEmitter: any = new EventEmitter<string>()

  fileName = '';
  debug: boolean = false;

  constructor(public globalService: GlobalService
  ) {
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      this.fileEmitter.emit(formData);
      this.fileNameEmitter.emit(this.fileName);
    }
  }

}
