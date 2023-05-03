import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pipeline, ShortStrategy } from 'src/app/models/pipeline.model';
import { Strategy } from 'src/app/models/strategy.model';
import { StrategyAPIService } from 'src/app/services/strategy-api.service';

@Component({
  selector: 'app-pipeline-view',
  templateUrl: './pipeline-view.component.html',
  styleUrls: ['./pipeline-view.component.scss']
})
export class PipelineViewComponent implements OnChanges {

  @Input() selectedPipeline!: Pipeline;

  strategyList: Strategy[] = [];
  pipelineStatus: boolean = true;

  constructor(
    private strategyAPI: StrategyAPIService,
  ) { 
    this.fetchStrategies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedPipeline: Pipeline = changes['selectedPipeline'].currentValue;
    if (updatedPipeline.id != -1) {
      this.selectedPipeline = updatedPipeline;
      this.pipelineStatus = this.verifyPipeline(this.selectedPipeline.strategies);
    }
  }

  fetchStrategies() {
    this.strategyAPI.getAllStrategies().subscribe({
      next: (strategies) => {
        this.strategyList = strategies;
      }
    })
  }

  verifyPipeline(strategies: ShortStrategy[]): boolean {
    const strategiesNotInList = strategies.filter(shortStrategy => !this.strategyList.some(strategy => shortStrategy.id === strategy.id));
    return strategiesNotInList.length == 0;
  }

}
