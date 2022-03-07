import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    loadChildren: () => import('./views/projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./views/projects/project-tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'configuration',
    loadChildren: () => import('./views/configuration/configuration.module').then( m => m.ConfigurationPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./views/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'download-or-send-modal',
    loadChildren: () => import('./views/projects/reports/download-or-send-modal/download-or-send-modal.module').then( m => m.DownloadOrSendModalModule)
  },
  {
    path: 'events-or-works-modal',
    loadChildren: () => import('./views/projects/reports/events-or-works-modal/events-or-works-modal.module').then( m => m.EventsOrWorksModalModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../app/views/chat/chat.module').then( m => m.ChatPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }