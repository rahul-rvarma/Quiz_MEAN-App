import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './pages/quiz-list/quiz-list.component';
import { QuizTakeComponent } from './pages/quiz-take/quiz-take.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminCreateComponent } from './pages/admin-create/admin-create.component';

const routes: Routes = [
  { path: '', component: LoginComponent },         // <--- root shows Login
  { path: 'quiz/:id', component: QuizTakeComponent },
  { path: 'list', component: QuizListComponent },  // moved quiz list to /list
  { path: 'login', component: LoginComponent },    // keep /login available
  { path: 'admin/create', component: AdminCreateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
