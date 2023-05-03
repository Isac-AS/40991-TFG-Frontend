import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-documentation-test-page',
  templateUrl: './documentation-test-page.component.html',
  styleUrls: ['./documentation-test-page.component.scss']
})
export class DocumentationTestPageComponent {

  constructor(
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Documentación > Baterías de tests'
    })
  }

}
