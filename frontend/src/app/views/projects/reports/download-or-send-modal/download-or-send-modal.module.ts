import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadOrSendModalRoutingModule } from './download-or-send-modal-routing.module';

import { DownloadOrSendModal } from './download-or-send-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadOrSendModalRoutingModule
  ],
  declarations: [DownloadOrSendModal]
})
export class DownloadOrSendModalModule {}
