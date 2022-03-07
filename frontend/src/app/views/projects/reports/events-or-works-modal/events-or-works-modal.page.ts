import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DownloadOrSendModal } from '../download-or-send-modal/download-or-send-modal.page';
import { PdfService } from 'src/app/services/pdf/pdf.service';


@Component({
  selector: 'app-events-or-works-modal',
  templateUrl: './events-or-works-modal.page.html',
  styleUrls: ['./events-or-works-modal.page.scss'],
})
export class EventsOrWorksModal implements OnInit {

  constructor(private modalController: ModalController, private pdfService: PdfService) { }

  private modalOpen: boolean = false;
  ngOnInit() {

  }

  async openModal() {

    const modal = await this.modalController.create({
      component: DownloadOrSendModal,
      handle: false,
      initialBreakpoint: 0.16,
      breakpoints: [0, 0.16],
    });

    modal.onDidDismiss().then((o) => { this.modalOpen = false })

    if (!this.modalOpen) {
      this.modalOpen = true;

      return await modal.present();
    }
  }

  category(category){
  this.pdfService.category = category;
  }

}
