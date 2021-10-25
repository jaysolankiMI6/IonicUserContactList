import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.page.html',
  styleUrls: ['intro.page.scss'],
})
export class IntroPage {

  constructor(private router: Router,private menuCtrl: MenuController) { }
  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }
  login() {
    this.router.navigate(['/login'])
  }
  registration() {
    this.router.navigate(['/registration'])
  }
}
