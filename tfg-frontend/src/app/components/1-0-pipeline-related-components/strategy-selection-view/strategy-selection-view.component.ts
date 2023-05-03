import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ShortStrategy } from 'src/app/models/pipeline.model';

@Component({
  selector: 'app-strategy-selection-view',
  templateUrl: './strategy-selection-view.component.html',
  styleUrls: ['./strategy-selection-view.component.scss']
})
export class StrategySelectionViewComponent implements OnChanges {


  @Input() strategies!: ShortStrategy[];
  @Output() strategyDeletionEmitter: any = new EventEmitter<any>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void { }

  emitStrategyDeletion(shortStrategy: ShortStrategy) {
    this.strategyDeletionEmitter.emit(shortStrategy)
  }

  getBackgroundColor(stage: string) {
    switch (stage) {
      case "Voz a texto":
        return "#2196F3"
      case "Intermedia":
        return "#FF8F00"
      case "Final":
        return "#4CAF50"
    }
    return "#e06546"
  }

}
