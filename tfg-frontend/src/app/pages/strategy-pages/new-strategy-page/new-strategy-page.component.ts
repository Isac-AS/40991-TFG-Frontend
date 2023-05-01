import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Strategy } from 'src/app/models/strategy.model';
import { FileAPIService } from 'src/app/services/file.service';
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

  usageStage: "1" | "2" | "3" = "1";
  result: boolean = false;
  backendErrorMessage: string = "Unknown Error";
  failureErrorStage: string = "";
  processingStage: string = "";

  constructor(
    private fb: FormBuilder,
    public globalService: GlobalService,
    private strategyAPI: StrategyAPIService,
    private fileService: FileAPIService
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
    this.usageStage = "2"
    this.processingStage = "Acomodando directorios..."
    // Attempt to create strategy
    this.strategyAPI.setupStrategyCreation(this.strategy).subscribe({
      next: res => {
        if (this.debug) {
          console.log("[DEBUG] - [NEW-STRATEGY-PAGE]: Strategy creation upload:");
          console.log(res);
          console.log("*---*")
        }
        // If successfull attempt to upload files
        if (res.result) {
          // Extract path info
          let strategy_dir = res.message;
          let python_file_path = res.strategy.python_file_path;
          if (this.pythonFile) {
            // Add information to FormData
            this.pythonFile.append("python_file_path", python_file_path)
            // Update stage message
            this.processingStage = "Subiendo fichero '.py'...";
            // Attempt to upload python file
            this.fileService.uploadFile("/strategies/upload_python_file", this.pythonFile).subscribe({
              next: res => {
                if (this.debug) {
                  console.log("[DEBUG] - [NEW-STRATEGY-PAGE]: Python File upload res:");
                  console.log(res);
                  console.log("*---*")
                }
                if (res.result) {
                  if (this.requirementsFile) {
                    this.processingStage = "Subiendo fichero 'requirements.txt'..."
                    // Attempt to upload requirements file
                    this.requirementsFile.append("strategy_dir", strategy_dir)
                    this.fileService.uploadFile("/strategies/upload_requirements_file", this.requirementsFile).subscribe({
                      next: res => {
                        if (this.debug) {
                          console.log("[DEBUG] - [NEW-STRATEGY-PAGE]: Requirements File upload res:");
                          console.log(res);
                          console.log("*---*")
                        }
                        if (res.result) {
                          this.processingStage = "Creando entorno virtual e instalando dependencias..."
                          this.strategyAPI.createStrategy(this.strategy).subscribe({
                            next: res => {
                              if (this.debug) {
                                console.log("[DEBUG] - [NEW-STRATEGY-PAGE]: Strategy creation res:");
                                console.log(res);
                                console.log("*---*")
                              }
                              this.usageStage = "3"
                              this.result = res.result;
                              if (!res.result) {
                                this.abortCreation("Bad strategy creation step (last step).", res.message);
                              }
                            }
                          })
                        } else {
                          this.abortCreation("Bad response from requirements file upload.", res.message);
                        }
                      }
                    });
                  } else {
                    this.abortCreation("No or undefined requirements file.", res.message);
                  }
                } else {
                  this.abortCreation("Bad response from python file upload.", res.message);
                }
              }
            })
          } else {
            this.abortCreation("No or undefined python file.", res.message);
          }
        } else {
          this.abortCreation("Bad response from strategy setup request.", res.message);
        }
      }
    })
  }

  abortCreation(stage: string, message: string) {
    if (this.debug) {
      console.log("[DEBUG] - [NEW-STRATEGY-PAGE]: Something went wrong, undoing strategy creation:");
      console.log(stage);
      console.log("*---*")
    }
    this.usageStage = '3';
    this.result = false;
    this.failureErrorStage = stage;
    this.backendErrorMessage = message;
  }
}
