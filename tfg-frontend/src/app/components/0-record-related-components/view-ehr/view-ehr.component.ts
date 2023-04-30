import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HealthRecord } from 'src/app/models/health-record.model';
import { FileAPIService } from 'src/app/services/file.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-view-ehr',
  templateUrl: './view-ehr.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./view-ehr.component.scss']
})
export class ViewEhrComponent implements OnChanges {

  @Input() selectedRecord!: HealthRecord;
  audioURL: any;
  audioBlob: any;

  debug: boolean = false;

  constructor(
    private fileAPI: FileAPIService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
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
      console.log("[DEBUG] - [VIEW-EHR-COMPONENT]: Cambios detectados:")
      console.log(changes)
      console.log("*---*")
    }
    let updatedRecord: HealthRecord = changes['selectedRecord'].currentValue
    if (updatedRecord.id != -1) {
      this.fileAPI.getRecordAudio(updatedRecord.recording_path).subscribe(
        blob => {
          this.audioBlob = blob;
          this.cdRef.detectChanges();
        }
      )
    }
  }
}
