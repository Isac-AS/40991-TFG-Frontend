import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, startWith } from 'rxjs';
import { Pipeline, ShortStrategy } from 'src/app/models/pipeline.model';
import { Strategy } from 'src/app/models/strategy.model';
import { GlobalService } from 'src/app/services/global.service';
import { PipelineAPIService } from 'src/app/services/pipepile-api.service';
import { StrategyAPIService } from 'src/app/services/strategy-api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-pipeline-page',
  templateUrl: './new-pipeline-page.component.html',
  styleUrls: ['./new-pipeline-page.component.scss']
})
export class NewPipelinePageComponent {

  strategyList: Strategy[] = [];

  pipelineForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
  })

  builtPipeline: Pipeline = {
    name: 'Ninguno',
    description: '',
    strategies: []
  }

  selectedStrategies: Strategy[] = [];
  newStrategyControl = new FormControl<string | Strategy>('');
  filteredOptions: Observable<Strategy[]> | undefined;

  constructor(
    private fb: FormBuilder,
    public globalService: GlobalService,
    private pipelineAPI: PipelineAPIService,
    private strategyAPI: StrategyAPIService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Nuevo Pipeline'
    })
    this.fetchStrategies();
  }

  filterOptions() {
    this.filteredOptions = this.newStrategyControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.strategyList.slice();
      }),
    );
  }

  private _filter(name: string): Strategy[] {
    const filterValue = name.toLowerCase();
    return this.strategyList.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  
  displayName(strategy: Strategy): string {
    return strategy && strategy.name ? strategy.name : '';
  }

  fetchStrategies() {
    this.strategyAPI.getAllStrategies().subscribe({
      next: (strategies) => {
        console.log(strategies)
        this.strategyList = strategies;
        this.filterOptions()
      }
    })
  }

  removeStrategy(strategy_id: number) {
    this.selectedStrategies = this.selectedStrategies.filter(item => item.id !== strategy_id);
  }

  addStrategy() {
    this.selectedStrategies.push(<Strategy>this.newStrategyControl.value!)
    this.newStrategyControl.reset()
    this.newStrategyControl.markAsUntouched()
    console.log(this.selectedStrategies)
  }

  updateBuiltPipeline() {
    this.builtPipeline.name = this.pipelineForm.value.name!;
    this.builtPipeline.description = this.pipelineForm.value.description!;
    this.builtPipeline.strategies = [];
    this.selectedStrategies.forEach(strategy => {
      let shortStrategy: ShortStrategy = {
        name: strategy.name,
        id: strategy.id!
      }
      this.builtPipeline.strategies.push(shortStrategy);
    });
    console.log(this.builtPipeline)
  }

  createPipeline() {
    this.pipelineAPI.createPipeline(this.builtPipeline).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }
}
