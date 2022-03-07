import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadOrSendModal } from './download-or-send-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadOrSendModal
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadOrSendModalRoutingModule {}
