import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsOrWorksModalRoutingModule } from './events-or-works-modal-routing.module';

import { EventsOrWorksModal } from './events-or-works-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsOrWorksModalRoutingModule
  ],
  declarations: [EventsOrWorksModal]
})
export class EventsOrWorksModalModule {}
