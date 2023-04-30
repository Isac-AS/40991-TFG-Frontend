import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BackendAPIService } from 'src/app/services/backend.service';
import { GlobalService } from 'src/app/services/global.service';
import { TestingService } from 'src/app/services/testing.service';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent implements OnInit {

  currentUser: User = {
    email: '',
    username: '',
    password: '',
    role: '',
    is_admin: false
  }

  currentUserMessage: string = 'No hay un usuario que haya iniciado sesión'
  debug: boolean = true;

  constructor(
    private backendService: BackendAPIService,
    public globalService: GlobalService,
    private userAPIService: UserApiService,
    private testingService: TestingService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Página de pruebas'
    })
  }

  ngOnInit() {
  }

  ping() {
    this.backendService.ping().subscribe({
      next: (res: any) => {
        if (this.debug) {
          console.log("[DEBUG] - [TESTING-PAGE]: Ping response:");
          console.log(res);
          console.log("*---*")
        }
      }
    })
  }

  test() {
    this.testingService.test().subscribe({
      next: (res: any) => {
        if (this.debug) {
          console.log("[DEBUG] - [TESTING-PAGE]: Test response:");
          console.log(res);
          console.log("*---*")
        }
      }
    })
  }

  logOut() {
    this.userAPIService.logOut().subscribe({
      next: res => {
        if (this.debug) {
          console.log("[DEBUG] - [TESTING-PAGE]: LogOut response:");
          console.log(res);
          console.log("*---*")
        }
      }
    })
  }

  isAuthenticated() {
    this.userAPIService.idAuthenticated().subscribe({
      next: res => {
        this.currentUserMessage = res.message
        if (this.debug) {
          console.log("[DEBUG] - [TESTING-PAGE]: Is Authenticated response:");
          console.log(res);
          console.log("*---*")
        }
      }
    })
  }

  fetchCurrentUserData() {
    this.userAPIService.getCurrentUserData().subscribe({
      next: res => {
        if (this.debug) {
          console.log("[DEBUG] - [TESTING-PAGE]: Current User Data response:");
          console.log(res);
          console.log("*---*")
        }
        if (res.result == true) {
          this.currentUser.email = res.user.email;
          this.currentUser.role = res.user.role;
          this.currentUser.username = res.user.username;
          this.currentUser.password = res.user.password;
          this.currentUser.is_admin = res.user.is_admin;
          this.currentUserMessage = res.message;
        } else {
          this.currentUser.email = '';
          this.currentUser.role = '';
          this.currentUser.username = '';
          this.currentUser.password = ''
          this.currentUser.is_admin = false;
        }
      }
    })
  }

  speech_to_text() {
    this.testingService.speechToText().subscribe({
      next: (res: any) => {
        if (this.debug) {
          console.log("[DEBUG] - [TESTING-PAGE]: Speech To Text response:");
          console.log(res);
          console.log("*---*")
        }
      }
    })
  }

  spell_checking() {
    this.testingService.spellChecking().subscribe({
      next: (res: any) => {
        if (this.debug) {
          console.log("[DEBUG] - [TESTING-PAGE]: Spell Checking response:");
          console.log(res);
          console.log("*---*")
        }
      }
    })
  }

  default_ehr() {
    this.testingService.defaultEHR().subscribe({
      next: (res: any) => {
        if (this.debug) {
          console.log("[DEBUG] - [TESTING-PAGE]: Default EHR response:");
          console.log(res);
          console.log("*---*")
        }
      }
    })
  }

  add_electronic_health_record() {
    this.testingService.add_electronic_health_record().subscribe({
      next: (res: any) => {
        if (this.debug) {
          console.log("[DEBUG] - [TESTING-PAGE]: Add EHR response:");
          console.log(res);
          console.log("*---*")
        }
      }
    })
  }
}
