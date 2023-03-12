import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { API_URL } from "../env";
import { Observable } from "rxjs";

@Injectable()
export class FileAPIService {
    constructor(private http: HttpClient) {}

    uploadFile(path: string, audioFile: FormData): Observable<any> {
        return this.http.post(`${API_URL}${path}`, audioFile, { withCredentials: true})
    }
}
