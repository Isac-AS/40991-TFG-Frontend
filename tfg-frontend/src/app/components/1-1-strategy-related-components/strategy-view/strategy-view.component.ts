import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Strategy } from 'src/app/models/strategy.model';

@Component({
  selector: 'app-strategy-view',
  templateUrl: './strategy-view.component.html',
  styleUrls: ['./strategy-view.component.scss']
})
export class StrategyViewComponent implements OnChanges {

  @Input() selectedStrategy!: Strategy;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedStrategy: Strategy = changes['selectedStrategy'].currentValue;
    if (updatedStrategy.id != -1) {
      this.selectedStrategy = updatedStrategy;
    }
  }

}
