import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Strategy } from 'src/app/models/strategy.model';
import { GlobalService } from 'src/app/services/global.service';
import { StrategyAPIService } from 'src/app/services/strategy-api.service';

@Component({
  selector: 'app-new-strategy-page',
  templateUrl: './new-strategy-page.component.html',
  styleUrls: ['./new-strategy-page.component.scss']
})
export class NewStrategyPageComponent {

  debug: boolean = false;

  strategyForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    inputType: [null, Validators.required],
    outputType: [null, Validators.required],
    stage: [null, Validators.required]
  })

  possibleStages = ['Voz a texto', 'Intermedia', 'Final']

  strategy: Strategy = {
    name: "",
    description: "",
    python_file_path: "",
    env_path: "",
    input_type: "",
    output_type: "",
    stage: "",
  }

  pythonFile: FormData | undefined;
  pythonFileName: string | undefined;
  requirementsFile: FormData | undefined;
  requirementsFileName: string | undefined;

  constructor(
    private fb: FormBuilder,
    public globalService: GlobalService,
    private strategyAPI: StrategyAPIService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Nueva Estrategia'
    })
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

  updateStrategyInfo() {
    this.strategy.name = this.strategyForm.value.name!;
    this.strategy.description = this.strategyForm.value.description!;
    this.strategy.input_type = this.strategyForm.value.inputType!;
    this.strategy.output_type = this.strategyForm.value.outputType!;
    this.strategy.stage = this.strategyForm.value.stage!;
    if (this.debug) {
      console.log("[DEBUG] - [NEW-STRATEGY-PAGE]: Updated strategy info:");
      console.log(this.strategy);
      console.log("*---*");
    }
  }

  updatePythonFile(event: any) {
    this.pythonFile = event;
  }

  updatePythonFileName(event: string) {
    this.pythonFileName = event;
  }

  updateRequirementsFile(event: any) {
    this.requirementsFile = event;
  }

  updateRequirementsFileName(event: string) {
    this.requirementsFileName = event;
  }

  createStrategy() {
    if (this.debug) {
      console.log("[DEBUG] - [NEW-STRATEGY-PAGE]: Uploaded files:");
      console.log(this.pythonFile);
      console.log(this.requirementsFile);
      console.log("*---*")
    }
  }

}
