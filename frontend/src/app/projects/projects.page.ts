import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projects } from '../models/projects';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  public projectsArray: Array<Projects> = [];
  public projects: Projects;

  constructor(private router: Router, private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.loadInfo();
  }


  loadInfo() {
    this.projectsService.getProjects().subscribe((p: Array<Projects>) => {
      for (let project of p) {
        if (project.published == true) {
          this.projectsArray.push(project);
        
        }
      }
    })
  }

  goToOtherPage() {
    this.router.navigateByUrl("/other-page");
  }

  checkIfProjectIsPublished() {


    console.log(this.projectsArray);

  }
}















