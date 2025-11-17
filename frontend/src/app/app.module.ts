import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizListComponent } from './pages/quiz-list/quiz-list.component';
import { QuizTakeComponent } from './pages/quiz-take/quiz-take.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminCreateComponent } from './pages/admin-create/admin-create.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizTakeComponent,
    LoginComponent,
    AdminCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
