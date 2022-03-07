import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Schedule } from 'src/app/models/schedule';
import { catchError, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { LocalStorageService } from '../local-storage/local-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsUsingUrlEncoded = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  token = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };


  endpoint: string = "http://localhost:8000/api/schedule";

  constructor(private httpClient: HttpClient, private storage: Storage, private localStorageService: LocalStorageService) {

  }

  async getHttpOptions() {
    await this.localStorageService.getToken().then(o => {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${o}`
        })

      };

      ;
    });

  }

  async getSchedules() {
    await this.getHttpOptions();

    return await this.httpClient.get<Schedule[]>(this.endpoint, this.httpOptions);
  }

  async getScheduleById(id) {
    await this.getHttpOptions();
    return await this.httpClient.get<Schedule[]>(this.endpoint + '/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Schedule fetched: ${id}`)),
        catchError(this.handleError<Schedule[]>(`Get schedule id=${id}`))
      );
  }

  async getSchedulesByProjectId(projectId) {
    await this.getHttpOptions();
    return await this.httpClient.get<Schedule[]>(this.endpoint + "/projects/" + projectId, this.httpOptions).pipe(
      tap(_ => console.log("Schedule retrieved")),
      catchError(this.handleError<Schedule[]>("Get shedule", []))
    );
  }

  async createSchedule(schedule: Schedule) {
    await this.getHttpOptions();
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("project_id", schedule.project_id.toString());
    bodyEncoded.append("type_schedules_id", schedule.type_schedules_id.toString());
    bodyEncoded.append("rooms_id", schedule.rooms_id.toString());
    bodyEncoded.append("date", schedule.date.toString());
    bodyEncoded.append("hourRange", schedule.hourRange.toString());
    bodyEncoded.append("note", schedule.note.toString());

    const body = bodyEncoded.toString();

    return await this.httpClient.post<Schedule>(this.endpoint, body, this.httpOptions);
  }

  async updateSchedule(id, schedule: Schedule) {
    await this.getHttpOptions();

    let bodyEncoded = new URLSearchParams();

    bodyEncoded.append("project_id", schedule.project_id.toString());

    bodyEncoded.append("type_schedules_id", schedule.type_schedules_id.toString());
    bodyEncoded.append("rooms_id", schedule.rooms_id.toString());
    bodyEncoded.append("date", schedule.date.toString());
    bodyEncoded.append("hourRange", schedule.hourRange.toString());

    bodyEncoded.append("note", schedule.note.toString());

    const body = bodyEncoded.toString();



    return await this.httpClient.put<Schedule>(this.endpoint + "/" + id, body, this.httpOptions).pipe(
      tap(_ => console.log(`Shedule update : ${id}`)),
      catchError(this.handleError<Schedule[]>("Update schdule"))
    );;
  }


  async deleteSchedule(idSchedule: number) {
    await this.getHttpOptions();
    return await this.httpClient.delete<Schedule>(this.endpoint + "/" + idSchedule, this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}