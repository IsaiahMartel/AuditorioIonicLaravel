import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PdfService } from 'src/app/services/pdf/pdf.service';

@Component({
  selector: 'app-download-or-send-modal',
  templateUrl: './download-or-send-modal.page.html',
  styleUrls: ['./download-or-send-modal.page.scss'],
})
export class DownloadOrSendModal implements OnInit {


  constructor(private modalController: ModalController, private pdfService: PdfService,) { }

  ngOnInit() {
  
  }

  downloadOrSend(option){
    this.pdfService.downloadOrSend = option;
    this.pdfService.getOptions();
  }
}
