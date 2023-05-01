import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Pipeline } from 'src/app/models/pipeline.model';
import { GlobalService } from 'src/app/services/global.service';
import { PipelineAPIService } from 'src/app/services/pipepile-api.service';

@Component({
  selector: 'app-pipeline-modification',
  templateUrl: './pipeline-modification.component.html',
  styleUrls: ['./pipeline-modification.component.scss']
})
export class PipelineModificationComponent implements OnChanges {

  debug: boolean = false;

  @Input() selectedPipeline!: Pipeline;
  @Output() updatedPipelineEmmiter: any = new EventEmitter<any>()

  pipelineForm = this.fb.group({
    name: ["", Validators.required],
    description: ["", [Validators.required]],
  })

  usageStage: "1" | "2" | "3" = "1";
  result: boolean = false;
  backendErrorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private pipelineAPIService: PipelineAPIService,
    public globalService: GlobalService
  ) {
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedPipeline = changes['selectedPipeline'].currentValue;
    this.selectedPipeline = updatedPipeline;
    if (this.selectedPipeline.id != -1) {
      this.updateFormValue(this.selectedPipeline.name, this.selectedPipeline.description)
    }
  }

  updateFormValue(name: string, description: string) {
    this.pipelineForm.setValue({
      name: name,
      description: description
    });
  }

  modifyPipeline() {
    this.selectedPipeline.name = this.pipelineForm.value.name!;
    this.selectedPipeline.description = this.pipelineForm.value.description!;
    if (this.debug) {
      console.log("[DEBUG] - [MODIFY-PIPELINE-COMPONENT]: About to modify pipeline:");
      console.log(this.selectedPipeline);
      console.log("*---*");
    }
    this.usageStage = '2';
    this.pipelineAPIService.updatePipeline(this.selectedPipeline).subscribe({
      next: res => {
        if (this.debug) {
          console.log("[DEBUG] - [MODIFY-PIPELINE-COMPONENT]: Modification attempt response:");
          console.log(res);
          console.log("*---*");
        }
        this.usageStage = '3';
        this.result = res.result;
        if (res.result) {
          this.updatedPipelineEmmiter.emit(res.pipeline);
        } else {
          this.backendErrorMessage = res.message;
        }
      }
    })
  }

}
