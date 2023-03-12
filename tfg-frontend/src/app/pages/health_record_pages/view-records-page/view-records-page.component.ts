import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-view-records-page',
  templateUrl: './view-records-page.component.html',
  styleUrls: ['./view-records-page.component.scss']
})
export class ViewRecordsPageComponent implements OnInit {

  constructor(
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Ver Registros'
    })
   }

  ngOnInit() {
  }

}
