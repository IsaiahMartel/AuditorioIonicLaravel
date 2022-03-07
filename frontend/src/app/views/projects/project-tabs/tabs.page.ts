import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public urlSplitArray : string[] = [];
  public id : string;
  
  constructor(private router: Router) { this.urlSplitArray = this.router.url.split("/");
  this.id= this.urlSplitArray.slice(-1)[0];}

  ngOnInit() {
   
  }
  
}
