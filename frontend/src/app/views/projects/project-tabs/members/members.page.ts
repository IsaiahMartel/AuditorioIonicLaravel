import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DirectorProjects } from '../../../../models/director-projects';
import { DirectorProjectsService } from 'src/app/services/director-projects/director-projects.service';
import { SoloistProjects } from '../../../../models/soloist-projects';
import { SoloistProjectsService } from '../../../../services/soloists-projects/soloist-projects.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  public directorProjectArray: Array<DirectorProjects> = [];
  project_id = this.activatedRoute.snapshot.paramMap.get('id');
  public soloistProjectArray: Array<SoloistProjects> = [];

  constructor(private router: Router, 
    private directorProjectService: DirectorProjectsService, 
    private activatedRoute: ActivatedRoute,
    private soloistProjectService: SoloistProjectsService, 
    private alertController : AlertController) { }


  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {

    this.directorProjectService.getDirectorProjectsByProjectId(this.project_id).then(o => {
      o.subscribe((s: Array<DirectorProjects>) => {
        this.directorProjectArray = s;

      }, (error) => {
        let errorJSON = error.error
        let errorMessage = ""
        Object.values(errorJSON).forEach(element => errorMessage += element + "\n");



        this.presentAlert(errorMessage);
      })
    })

    this.soloistProjectService.getSoloistProjectsByProjectId(this.project_id).then(o => {
      o.subscribe((s: Array<SoloistProjects>) => {
        this.soloistProjectArray = s;

      }, (error) => {
        let errorJSON = error.error
        let errorMessage = ""
        Object.values(errorJSON).forEach(element => errorMessage += element + "\n");

        this.presentAlert(errorMessage);
      })
    })

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