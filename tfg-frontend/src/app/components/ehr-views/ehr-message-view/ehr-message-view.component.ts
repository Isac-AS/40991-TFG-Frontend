import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ehr-message-view',
  templateUrl: './ehr-message-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./ehr-message-view.component.scss']
})
export class EhrMessageViewComponent implements OnChanges {

  
  @Input() healthRecordMessage!: String;
  segments: String[] = []
  
  constructor() { }

  ngOnChanges (changes: SimpleChanges) {
    let updatedHealthRecordMessageValue = changes['healthRecordMessage'].currentValue
    if (updatedHealthRecordMessageValue != "") {
      this.segments = updatedHealthRecordMessageValue.split("\r")
    }
    //console.log(changes['healthRecordMessage'].currentValue)
    //console.log(this.segments)
  }
  
}
