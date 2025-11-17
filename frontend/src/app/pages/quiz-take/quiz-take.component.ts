import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-quiz-take',
  templateUrl: './quiz-take.component.html'
})
export class QuizTakeComponent implements OnInit {
  quizId!: string;
  title = '';
  questions: any[] = [];
  answers: number[] = [];
  submitted = false;
  result: any = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private qs: QuizService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.quizId) { this.router.navigateByUrl('/'); return; }
    this.loading = true;
    this.qs.getQuizQuestions(this.quizId).subscribe({
      next: (res) => {
        this.title = res.title;
        this.questions = res.questions;
        this.answers = new Array(this.questions.length).fill(null);
        this.loading = false;
      },
      error: (err) => { this.error = err.message || 'Failed to load'; this.loading = false; }
    });
  }

  selectAnswer(qIdx: number, optionIdx: number) {
    this.answers[qIdx] = optionIdx;
  }

  submit() {
    this.submitted = true;
    this.qs.submitAnswers(this.quizId, this.answers).subscribe({
      next: (res) => { this.result = res; },
      error: (err) => { this.error = err.message || 'Submit failed'; }
    });
  }
}
