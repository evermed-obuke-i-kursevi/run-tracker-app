import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RunningComponent } from './components/running/running.component';
import { CurrentRunningComponent } from './components/running/current-running/current-running.component';
import { NewRunningComponent } from './components/running/new-running/new-running.component';
import { HistoryRunningComponent } from './components/running/history-running/history-running.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { StopRunningComponent } from './components/dialogs/stop-running/stop-running.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    RunningComponent,
    CurrentRunningComponent,
    NewRunningComponent,
    HistoryRunningComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopRunningComponent,
    DeleteDialogComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
