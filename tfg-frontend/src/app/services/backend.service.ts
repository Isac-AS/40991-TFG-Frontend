import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs";
import { API_URL } from "../env";

@Injectable()
export class BackendAPIService {
    constructor(private http: HttpClient) {}

    // GET: Ping the backend
    ping(): any {
        console.log("[DEBUG] - [BACKEND-SERVICE]: Request: ping")
        return this.http.post(`${API_URL}/api/ping`, {'': ''})
    }
}
