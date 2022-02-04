import { Component } from '@angular/core';
import { Schedule } from '../../models/schedule';
import { SchedulesService } from '../../services/schedule.service';
import { Projects } from '../../models/projects';
import { ProjectsService } from '../../services/projects.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public schedule: Schedule;
  public projects_id: number[] = [];
  public projects: Projects;
  public scheduleArray: Schedule[] = [];

  constructor(private projectsService: ProjectsService,
    private scheduleService: SchedulesService) { }

  ngOnInit(): void {
    // this.loadInfo();
  }

  ionViewDidEnter() {
    this.loadInfo();
  }

  loadInfo() {
    this.projectsService.getProjects().then((o) => {
      console.log(o)
      o.subscribe((p) => {
        console.log("esta es la salida")
        console.log(p)
        // for (let project of p) {
        //   if (project.published == true) {
        //     this.projects_id.push(project.id);
        //     this.getSchedules();
        //   }
        // }
      })
    });
  }

  getSchedules() {
    for (let i of this.projects_id) {
      this.scheduleService.getSchedulesByProjectId(i).subscribe((s: Array<Schedule>) => {
        this.scheduleArray = s;
      });
    }
  }
}
