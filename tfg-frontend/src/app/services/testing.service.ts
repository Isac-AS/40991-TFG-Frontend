import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_URL } from "../env";

@Injectable({
  providedIn: 'root'
})
export class TestingService {

  constructor(private http: HttpClient) { }

  test(): any {
    return this.http.post(`${API_URL}/api/test`, { '': '' })
  }

  speechToText(): any {
    return this.http.post(`${API_URL}/api/test/test_s2t_strategy`, { '': '' })
  }

  spellChecking(): any {
    return this.http.post(`${API_URL}/api/test/spell_checking_strategy`, { '': '' })
  }

  defaultEHR(): any {
    return this.http.post(`${API_URL}/api/test/test_default_ehr`, { '': '' })
  }

  add_electronic_health_record(): any {
    return this.http.post(`${API_URL}/api/test/add_example_ehr`, { '': '' })
  }

}
