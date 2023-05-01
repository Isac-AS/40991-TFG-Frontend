import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-backend-results-section',
  templateUrl: './backend-results-section.component.html',
  styleUrls: ['./backend-results-section.component.scss']
})
export class BackendResultsSectionComponent implements OnChanges {

  @Input() result!: boolean;
  @Input() successfullText!: string;
  @Input() unsuccessfullText!: string;
  @Input() errorMessage!: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.result = changes['result'].currentValue
    this.successfullText = changes['successfullText'].currentValue
    this.unsuccessfullText = changes['unsuccessfullText'].currentValue
    this.errorMessage = changes['errorMessage'].currentValue
  }

}
