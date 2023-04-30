import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HealthRecord } from 'src/app/models/health-record.model';
import { FileAPIService } from 'src/app/services/file.service';

@Component({
  selector: 'app-view-ehr',
  templateUrl: './view-ehr.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./view-ehr.component.scss']
})
export class ViewEhrComponent implements OnChanges {

  @Input() selectedRecord!: HealthRecord;

  audioURL: any;

  constructor(
    private fileAPI: FileAPIService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Cambios en ventana")
    console.log(changes)
    let updatedRecord: HealthRecord = changes['selectedRecord'].currentValue
    if (updatedRecord.id != -1) {
      this.fileAPI.getRecordAudio(updatedRecord.recording_path).subscribe(
        blob => {
          this.audioURL = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(blob)
          );
          this.cdRef.detectChanges();
        }
      )
    }
  }
}
