import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRecordFromRecordPageComponent } from './pages/health_record_pages/new-record-from-record-page/new-record-from-record-page.component';
import { NewRecordPageComponent } from './pages/health_record_pages/new-record-page/new-record-page.component';
import { ViewRecordsPageComponent } from './pages/health_record_pages/view-records-page/view-records-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewPipelinePageComponent } from './pages/pipeline-pages/new-pipeline-page/new-pipeline-page.component';
import { ViewPipelinesPageComponent } from './pages/pipeline-pages/view-pipelines-page/view-pipelines-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NewStrategyPageComponent } from './pages/strategy-pages/new-strategy-page/new-strategy-page.component';
import { ViewStrategiesPageComponent } from './pages/strategy-pages/view-strategies-page/view-strategies-page.component';
import { TestingPageComponent } from './pages/testing-page/testing-page.component';
import { UserManagementPageComponent } from './pages/user-management-page/user-management-page.component';
import { IntroductionPageComponent } from './pages/documentation_pages/introduction/introduction-page/introduction-page.component';
import { StrategyGuidePageComponent } from './pages/documentation_pages/guides/strategy-guide-page/strategy-guide-page.component';
import { RecordsGuidePageComponent } from './pages/documentation_pages/guides/records-guide-page/records-guide-page.component';
import { PipelineGuidePageComponent } from './pages/documentation_pages/guides/pipeline-guide-page/pipeline-guide-page.component';
import { DocumentationTestPageComponent } from './pages/documentation_pages/code_pages/documentation-test-page/documentation-test-page.component';
import { ImportantCodePageComponent } from './pages/documentation_pages/code_pages/important-code-page/important-code-page.component';

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "testing",
    component: TestingPageComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "register",
    component: RegisterPageComponent
  },
  {
    path: "user_management",
    component: UserManagementPageComponent
  },
  {
    path: "new_record",
    component: NewRecordPageComponent
  },
  {
    path: "new_record_from_record",
    component: NewRecordFromRecordPageComponent
  },
  {
    path: "view_records",
    component: ViewRecordsPageComponent
  },
  {
    path: "new_pipeline",
    component: NewPipelinePageComponent
  },
  {
    path: "view_pipelines",
    component: ViewPipelinesPageComponent
  },
  {
    path: "new_strategy",
    component: NewStrategyPageComponent
  },
  {
    path: "view_strategies",
    component: ViewStrategiesPageComponent
  },
  {
    path: "docs/introduction",
    component: IntroductionPageComponent
  },
  {
    path: "docs/guides/strategy",
    component: StrategyGuidePageComponent
  },
  {
    path: "docs/guides/record",
    component: RecordsGuidePageComponent,

  },
  {
    path: "docs/guides/pipeline",
    component: PipelineGuidePageComponent
  },
  {
    path: "docs/code",
    component: ImportantCodePageComponent
  },
  {
    path: "docs/tests",
    component: DocumentationTestPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
