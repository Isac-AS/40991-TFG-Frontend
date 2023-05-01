// Basic imports
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular material
import { CustomMaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';

// Pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TestingPageComponent } from './pages/testing-page/testing-page.component';
// User related
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserManagementPageComponent } from './pages/user-management-page/user-management-page.component';
// Pipeline, strategies and records
import { NewPipelinePageComponent } from './pages/pipeline-pages/new-pipeline-page/new-pipeline-page.component';
import { ViewPipelinesPageComponent } from './pages/pipeline-pages/view-pipelines-page/view-pipelines-page.component';
import { NewStrategyPageComponent } from './pages/strategy-pages/new-strategy-page/new-strategy-page.component';
import { ViewStrategiesPageComponent } from './pages/strategy-pages/view-strategies-page/view-strategies-page.component';
import { NewRecordPageComponent } from './pages/health_record_pages/new-record-page/new-record-page.component';
import { ViewRecordsPageComponent } from './pages/health_record_pages/view-records-page/view-records-page.component';
import { NewRecordFromRecordPageComponent } from './pages/health_record_pages/new-record-from-record-page/new-record-from-record-page.component';

// Dialogs
import { UserDeletionDialogContent } from './pages/user-management-page/user-management-page.component';
import { EntryDeletionDialogComponent } from './components/entry-deletion-dialog/entry-deletion-dialog.component';

// Services
import { BackendAPIService } from './services/backend.service';
import { AudioRecordingService } from './services/audio-recording.service';
import { UserApiService } from './services/user-api.service';
import { HeathRecordAPIService } from './services/health-record-api.service';
import { PipelineAPIService } from './services/pipepile-api.service';
import { StrategyAPIService } from './services/strategy-api.service';
import { FileAPIService } from './services/file.service';
import { TestingService } from './services/testing.service';


// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { AudioRecorderComponent } from './components/2-0-audio-related-components/audio-recorder/audio-recorder.component';
import { PipelineTableComponent } from './components/1-0-pipeline-related-components/pipeline-table/pipeline-table.component';
import { StrategyTableComponent } from './components/1-1-strategy-related-components/strategy-table/strategy-table.component';
import { EhrTableComponent } from './components/0-record-related-components/ehr-table/ehr-table.component';
import { ViewEhrComponent } from './components/0-record-related-components/view-ehr/view-ehr.component';
import { NerViewComponent } from './components/0-record-related-components/ehr-views/ner-view/ner-view.component';
import { RecordContentSelectionComponent } from './components/0-record-related-components/ehr-views/record-content-selection/record-content-selection.component';
import { PipelineStageSelectionComponent } from './components/0-record-related-components/ehr-views/pipeline-stage-selection/pipeline-stage-selection.component';
import { EhrMessageViewComponent } from './components/0-record-related-components/ehr-views/ehr-message-view/ehr-message-view.component';
import { AudioPlayerComponent } from './components/2-0-audio-related-components/audio-player/audio-player.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { ModifyEhrComponent } from './components/0-record-related-components/modify-ehr/modify-ehr.component';
import { ProgressBarSectionComponent } from './components/3-0-user-feedback-related-components/progress-bar-section/progress-bar-section.component';
import { BackendResultsSectionComponent } from './components/3-0-user-feedback-related-components/backend-results-section/backend-results-section.component';
import { PipelineModificationComponent } from './components/1-0-pipeline-related-components/pipeline-modification/pipeline-modification.component';
import { PipelineViewComponent } from './components/1-0-pipeline-related-components/pipeline-view/pipeline-view.component';
import { StrategyArrayViewComponent } from './components/1-0-pipeline-related-components/strategy-array-view/strategy-array-view.component';
import { StrategyViewComponent } from './components/1-1-strategy-related-components/strategy-view/strategy-view.component';
import { StrategyModificationComponent } from './components/1-1-strategy-related-components/strategy-modification/strategy-modification.component';
import { PyFileModificationComponent } from './components/1-1-strategy-related-components/py-file-modification/py-file-modification.component';


@NgModule({
  declarations: [
    // Components
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ThemePickerComponent,
    AudioRecorderComponent,
    PipelineTableComponent,
    StrategyTableComponent,
    EhrTableComponent,
    ViewEhrComponent,
    NerViewComponent,
    RecordContentSelectionComponent,
    PipelineStageSelectionComponent,
    EhrMessageViewComponent,
    AudioPlayerComponent,
    FileUploaderComponent,
    ModifyEhrComponent,
    ProgressBarSectionComponent,
    BackendResultsSectionComponent,
    PipelineModificationComponent,
    PipelineViewComponent,
    StrategyArrayViewComponent,
    StrategyViewComponent,
    StrategyModificationComponent,
    PyFileModificationComponent,

    // Pages
    HomePageComponent,
    TestingPageComponent,
    // User related
    LoginPageComponent,
    RegisterPageComponent,
    UserManagementPageComponent,
    // Pipeline, strategies and records
    NewPipelinePageComponent,
    ViewPipelinesPageComponent,
    NewStrategyPageComponent,
    ViewStrategiesPageComponent,
    NewRecordPageComponent,
    ViewRecordsPageComponent,
    NewRecordFromRecordPageComponent,

    // Dialogs
    UserDeletionDialogContent,
    EntryDeletionDialogComponent,
    AudioRecorderComponent,
    EntryDeletionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    CustomMaterialModule
  ],
  providers: [
    BackendAPIService,
    AudioRecordingService,
    UserApiService,
    HeathRecordAPIService,
    PipelineAPIService,
    StrategyAPIService,
    FileAPIService,
    TestingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
