import { API_URL } from "../env";
import { catchError } from "rxjs";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from '@angular/common/http'
import { GlobalService } from "./global.service";
import { HealthRecord, HealthRecordRelatedResponse } from "../models/health-record.model";
import { FileAPIService } from "./file.service";

@Injectable()
export class HeathRecordAPIService {
    constructor(
        private http: HttpClient,
        public globalService: GlobalService,
        private fileService: FileAPIService
    ) { }

    getAllRecords(): Observable<HealthRecord[]> {
        return this.http.get<HealthRecord[]>(`${API_URL}/health_records/get_all`).pipe(
            catchError(error => {
                return throwError(() => new Error(error.message))
            }))
    }

    getHealthRecord(id: number): Observable<HealthRecordRelatedResponse> {
        return this.http.post<HealthRecordRelatedResponse>(`${API_URL}/health_records/read`, { 'id': id }, { withCredentials: true })
    }

    createRecordFromAudio(audio_file_path: string, pipelineId: number): Observable<HealthRecordRelatedResponse> {
        return this.http.post<HealthRecordRelatedResponse>(
            `${API_URL}/health_records/create_from_audio`,
            { 'audio_file_path': audio_file_path, 'pipeline_id': pipelineId },
            { withCredentials: true });
    }

    createRecordFromRecord(parentHealthRecord: HealthRecord, pipelineId: number, skipSteps: number): Observable<HealthRecordRelatedResponse> {
        return this.http.post<HealthRecordRelatedResponse>(
            `${API_URL}/health_records/create_from_record`,
            { 'parent_health_record': parentHealthRecord, 'pipeline_id': pipelineId, 'skip_steps': skipSteps },
            { withCredentials: true })
    }

    updateHealthRecord(healthRecord: HealthRecord): Observable<HealthRecordRelatedResponse> {
        return this.http.post<HealthRecordRelatedResponse>(`${API_URL}/health_records/update`, { 'healthRecord': healthRecord }, { withCredentials: true })
    }

    deleteHealthRecord(id: number): Observable<HealthRecordRelatedResponse> {
        return this.http.post<HealthRecordRelatedResponse>(`${API_URL}/health_records/delete`, { 'id': id }, { withCredentials: true })
    }
}
