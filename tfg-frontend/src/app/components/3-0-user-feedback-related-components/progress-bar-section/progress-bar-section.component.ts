import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar-section',
  templateUrl: './progress-bar-section.component.html',
  styleUrls: ['./progress-bar-section.component.scss']
})
export class ProgressBarSectionComponent implements OnChanges{

  @Input() text!: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.text = changes['text'].currentValue
  }
}
