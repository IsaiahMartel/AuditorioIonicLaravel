
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Schedule } from '../../../../models/schedule';
import { SchedulesService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  public scheduleArray: Array<Schedule> = [];
  public schedule: Schedule;
  project_id = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private router: Router,
    private scheduleService: SchedulesService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.scheduleService.getSchedulesByProjectId(this.project_id).then(o => {
      o.subscribe((s: Array<Schedule>) => {
        this.scheduleArray = s;
      }, (error) => {
        let errorJSON = error.error
        let errorMessage = ""
        Object.values(errorJSON).forEach(element => errorMessage += element + "\n");

        this.presentAlert(errorMessage);
      })
    })
  }





  deleteSchedule(idSchedule: number) {
    this.scheduleService.deleteSchedule(idSchedule).then(o => {
      o.subscribe(() => {
        this.loadInfo();
      });
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: 'Inténtalo de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }





}