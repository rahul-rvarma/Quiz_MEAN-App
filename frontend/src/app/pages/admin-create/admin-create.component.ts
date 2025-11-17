import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html'
})
export class AdminCreateComponent {
  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    durationMinutes: [10, Validators.required],
    questions: this.fb.array([])
  });

  get questions(): FormArray { return this.form.get('questions') as FormArray; }

  constructor(private fb: FormBuilder, private qs: QuizService, private router: Router) {
    // start with one question
    this.addQuestion();
  }

  newQuestion() {
    return this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([this.fb.control('', Validators.required), this.fb.control('', Validators.required)]),
      correctIndex: [0, Validators.required]
    });
  }

  addQuestion() {
    this.questions.push(this.newQuestion());
  }

  addOption(qIdx: number) {
    const opts = this.questions.at(qIdx).get('options') as FormArray;
    opts.push(this.fb.control('', Validators.required));
  }

  removeQuestion(i: number) { this.questions.removeAt(i); }

  submit() {
    if (this.form.invalid) return;
    const payload = this.form.value;
    this.qs.createQuiz(payload).subscribe({
      next: (res) => { this.router.navigate(['/']); },
      error: (err) => { alert(err.error?.error || 'Create failed'); }
    });
  }
}
