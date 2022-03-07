import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { GestureController, MenuController } from '@ionic/angular';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { ModalController } from '@ionic/angular';
import { DownloadOrSendModal } from './views/projects/reports/download-or-send-modal/download-or-send-modal.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('holdBtn', { read: ElementRef }) holdBtn: ElementRef;
  hold = 0;
  longPressActive = false;
  menuController: MenuController;

  private modalOpen: boolean = false;

  constructor( private router: Router, private gestureCtrl: GestureController, private localStorageService: LocalStorageService, private pdfService: PdfService, private modalController: ModalController) { }

  ngOnInit() {

  }


  ngAfterViewInit() {
   


    const longPress = this.gestureCtrl.create({
      el: this.holdBtn.nativeElement,
      threshold: 0,
      gestureName: 'long-press',
      onStart: ev => {
        this.longPressActive = true;
        this.increase();

      },
      onEnd: ev => {
        this.longPressActive = false;

      }
    }, true);

    longPress.enable(true);

  }

  increase(timeout = 200) {
    setTimeout(() => {
      if (this.longPressActive) {
        this.hold++;

        this.increase(timeout);

      }
    }, timeout);
    if (this.hold == 4) {
      this.openModal();
      this.pdfService.category = 0;
      this.hold = 0;
    }
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


}