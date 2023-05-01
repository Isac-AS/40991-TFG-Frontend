import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Strategy } from 'src/app/models/strategy.model';

@Component({
  selector: 'app-strategy-modification',
  templateUrl: './strategy-modification.component.html',
  styleUrls: ['./strategy-modification.component.scss']
})
export class StrategyModificationComponent implements OnChanges {

  @Input() selectedStrategy!: Strategy;
  @Output() updatedStrategyEmmiter: any = new EventEmitter<any>()

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedStrategy: Strategy = changes['selectedStrategy'].currentValue;
    if (updatedStrategy.id != -1) {
      this.selectedStrategy = updatedStrategy;
    }
  }

}
