import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Strategy } from 'src/app/models/strategy.model';
import { GlobalService } from 'src/app/services/global.service';
import { StrategyAPIService } from 'src/app/services/strategy-api.service';

@Component({
  selector: 'app-strategy-modification',
  templateUrl: './strategy-modification.component.html',
  styleUrls: ['./strategy-modification.component.scss']
})
export class StrategyModificationComponent implements OnChanges {

  debug: boolean = false;

  @Input() selectedStrategy!: Strategy;
  @Output() updatedStrategyEmmiter: any = new EventEmitter<any>()

  strategyForm = this.fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    inputType: ["", Validators.required],
    outputType: ["", Validators.required],
    stage: ["", Validators.required]
  })

  possibleStages = ['Voz a texto', 'Intermedia', 'Final']

  usageStage: "1" | "2" | "3" = "1";
  result: boolean = false;
  backendErrorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    public globalService: GlobalService,
    private strategyAPIService: StrategyAPIService,
  ) {
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedStrategy: Strategy = changes['selectedStrategy'].currentValue;
    if (updatedStrategy.id != -1) {
      this.selectedStrategy = updatedStrategy;
      this.updateFormValue()
    }
  }

  updateFormValue() {
    this.strategyForm.setValue({
      name: this.selectedStrategy.name,
      description: this.selectedStrategy.description,
      inputType: this.selectedStrategy.input_type,
      outputType: this.selectedStrategy.output_type,
      stage: this.selectedStrategy.stage
    });
  }

  modifyStrategy() {
    this.selectedStrategy.name = this.strategyForm.value.name!;
    this.selectedStrategy.description = this.strategyForm.value.description!;
    if (this.debug) {
      console.log("[DEBUG] - [MODIFY-STRATEGY-COMPONENT]: About to modify strategy:");
      console.log(this.selectedStrategy);
      console.log("*---*");
    }
    this.usageStage = '2';
    this.strategyAPIService.updateStrategy(this.selectedStrategy).subscribe({
      next: res => {
        if (this.debug) {
          console.log("[DEBUG] - [MODIFY-STRATEGY-COMPONENT]: Modification attempt response:");
          console.log(res);
          console.log("*---*");
        }
        this.usageStage = '3';
        this.result = res.result;
        if (res.result) {
          this.updatedStrategyEmmiter.emit(res.strategy);
        } else {
          this.backendErrorMessage = res.message;
        }
      }
    })
  }

}
