import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HealthRecord } from 'src/app/models/health-record.model';

@Component({
  selector: 'app-record-content-selection',
  templateUrl: './record-content-selection.component.html',
  styleUrls: ['./record-content-selection.component.scss']
})
export class RecordContentSelectionComponent {
  
  @Input() selectedRecord!: HealthRecord;
  @Output() selectedInputEmitter:any = new EventEmitter<any>()
  
  newRecordInput: any;
  
  constructor() { }

  emitNewRecordInput(value: any) {
    this.selectedInputEmitter.emit(value)
  }
}
