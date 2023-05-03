import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Pipeline, ShortStrategy } from 'src/app/models/pipeline.model';
import { GlobalService } from 'src/app/services/global.service';
import { PipelineAPIService } from 'src/app/services/pipepile-api.service';

@Component({
  selector: 'app-new-pipeline-page',
  templateUrl: './new-pipeline-page.component.html',
  styleUrls: ['./new-pipeline-page.component.scss']
})
export class NewPipelinePageComponent {

  pipelineForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
  })

  builtPipeline: Pipeline = {
    name: 'Ninguno',
    description: '',
    strategies: []
  }

  selectedStrategies: ShortStrategy[] = [];
  selectionStage: '1' | '2' | '3' = '1'

  debug: boolean = false;

  usageStage: "1" | "2" | "3" = "1";
  result: boolean = false;
  backendErrorMessage: string = "Unknown Error";
  failureErrorStage: string = "";
  processingStage: string = "Creando pipeline...";

  constructor(
    private fb: FormBuilder,
    public globalService: GlobalService,
    private pipelineAPI: PipelineAPIService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Nuevo Pipeline'
    })
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }


  addNewStrategy(strategy: any) {
    this.selectedStrategies.push(
      {
        id: strategy.id,
        name: strategy.name,
        stage: strategy.stage
      }
    )
    if (this.selectionStage == "1") {
      this.selectionStage = "2"
    } else if (this.selectionStage == "2" && strategy.stage == "Final") {
      this.selectionStage = "3"
    }
  }

  removeStrategy(strategy: ShortStrategy) {
    this.selectedStrategies = this.selectedStrategies.filter(item => item.id !== strategy.id);

    if (this.selectionStage == "2" && this.selectedStrategies.length == 0) {
      this.selectionStage = "1"
    } else if (this.selectionStage == "3") {
      this.selectionStage = "2"
    }
  }

  updateBuiltPipeline() {
    this.builtPipeline.name = this.pipelineForm.value.name!;
    this.builtPipeline.description = this.pipelineForm.value.description!;
    this.builtPipeline.strategies = [];
    this.selectedStrategies.forEach(strategy => {
      let shortStrategy: ShortStrategy = {
        name: strategy.name,
        id: strategy.id!,
        stage: strategy.stage
      }
      this.builtPipeline.strategies.push(shortStrategy);
    });
    if (this.debug) {
      console.log("[DEBUG] - [NEW-PIPELINE-PAGE]: Updated pipeline:");
      console.log(this.builtPipeline);
      console.log("*---*");
    }
  }


  createPipeline() {
    this.usageStage = '2';
    this.pipelineAPI.createPipeline(this.builtPipeline).subscribe({
      next: (res) => {
        if (this.debug) {
          console.log("[DEBUG] - [NEW-PIPELINE-PAGE]: Pipeline Creation response:");
          console.log(res);
          console.log("*---*");
        }
        this.usageStage = '3';
        this.result = res.result;
        if (!res.result) {
          this.backendErrorMessage = res.message;
        }
      }
    })
  }
}
