import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const API = environment.apiBase;

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(private http: HttpClient) {}

  listQuizzes(): Observable<any> {
    return this.http.get(`${API}/quiz`);
  }

  getQuizQuestions(id: string): Observable<any> {
    return this.http.get(`${API}/quiz/${id}/questions`);
  }

  submitAnswers(id: string, answers: number[]): Observable<any> {
    return this.http.post(`${API}/quiz/${id}/submit`, { answers });
  }

  createQuiz(payload: any): Observable<any> {
    return this.http.post(`${API}/quiz`, payload);
  }
}
