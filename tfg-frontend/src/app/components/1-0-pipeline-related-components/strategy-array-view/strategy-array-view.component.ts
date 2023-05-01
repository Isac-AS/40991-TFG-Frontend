import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShortStrategy } from 'src/app/models/pipeline.model';

@Component({
  selector: 'app-strategy-array-view',
  templateUrl: './strategy-array-view.component.html',
  styleUrls: ['./strategy-array-view.component.scss']
})
export class StrategyArrayViewComponent implements OnChanges {

  @Input() strategies!: ShortStrategy[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {}

}
