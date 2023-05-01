import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Strategy } from 'src/app/models/strategy.model';
import { FileAPIService } from 'src/app/services/file.service';
import { GlobalService } from 'src/app/services/global.service';
import { StrategyAPIService } from 'src/app/services/strategy-api.service';

@Component({
  selector: 'app-py-file-modification',
  templateUrl: './py-file-modification.component.html',
  styleUrls: ['./py-file-modification.component.scss']
})
export class PyFileModificationComponent implements OnChanges {

  debug: boolean = false;

  @Input() selectedStrategy!: Strategy;

  usageStage: "1" | "2" | "3" = "1";
  result: boolean = false;
  backendErrorMessage: string = "";

  pythonFile: FormData | undefined;
  pythonFileName: string | undefined;

  constructor(
    public globalService: GlobalService,
    private fileService: FileAPIService
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
      if (this.debug) {
        console.log("[DEBUG] - [STRATEGY-PY_FILE-MODIFICATION-COMPONENT]: Updated_strategy:");
        console.log(updatedStrategy);
        console.log("*---*")
      }
      this.selectedStrategy = updatedStrategy;
    }
  }

  updatePythonFile(event: any) {
    this.pythonFile = event;
  }

  updatePythonFileName(event: string) {
    this.pythonFileName = event;
  }

  uploadPythonFile() {
    this.usageStage = '2';
    if (this.pythonFile) {
      let python_file_path = this.selectedStrategy.python_file_path;
      // Add information to FormData
      this.pythonFile.append("python_file_path", python_file_path)
      this.fileService.uploadFile("/strategies/upload_python_file", this.pythonFile).subscribe({
        next: res => {
          if (this.debug) {
            console.log("[DEBUG] - [STRATEGY-PY_FILE-MODIFICATION-COMPONENT]: Python File upload res:");
            console.log(res);
            console.log("*---*")
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
}
