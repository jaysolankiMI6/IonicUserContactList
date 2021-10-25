import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { User } from '../services/user';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  user: User;
  constructor(private db: DbService,
    private formBuilder: FormBuilder,
    private router: Router,
    private splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private nativeStorage: NativeStorage,
    private toastController: ToastController) { }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
    this.splashScreen.hide();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
  get errorControl() {
    return this.loginForm.controls;
  }
  loginUser() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.loginForm.value)
      this.db.getUser(this.loginForm.value.username)
        .then((result: User) => {

          if (this.loginForm.value.username == result.u_email && this.loginForm.value.password == result.u_password) {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                username: JSON.stringify(result.u_email),
                userdata: JSON.stringify(result)
              }
            };
            this.router.navigate(['home'], navigationExtras);
            this.presentToast("Login Successfully");
            this.nativeStorage.setItem('user', { userdata: result })
              .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
              );
          } else {
            this.presentToast("Wrong password! Try again");
          }

        })
        .catch(() => {
          this.presentToast("User not found!");
        })
    }
  }
}
