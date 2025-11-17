import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html'
})
export class QuizListComponent implements OnInit {
  quizzes: any[] = [];
  loading = false;
  error = '';

  constructor(private qs: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.qs.listQuizzes().subscribe({
      next: (res) => { this.quizzes = res; this.loading = false; },
      error: (err) => { this.error = err.message || 'Failed to load'; this.loading = false; }
    });
  }

  takeQuiz(id: string) {
    this.router.navigate(['/quiz', id]);
  }
}
