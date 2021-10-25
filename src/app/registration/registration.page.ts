import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registerForm: FormGroup;
  isSubmitted = false;
  constructor(private db: DbService,
    private formBuilder: FormBuilder,
    private router: Router,
    private menuCtrl: MenuController,
    private toastController: ToastController) { }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, EmailValidator.isValid]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmpassword: ['', Validators.required],
      birthday: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      profilelink: ['', [Validators.required]],
    }, {
      validator: EmailValidator.MatchPassword // your validation method
    });
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
    return this.registerForm.controls;
  }
  registeredUser() {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      console.log('Please provide all the required values!')
      this.presentToast("Please fill up all details");
      return false;
    } else {
    console.log(this.registerForm.value)
    this.db.addUser(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.birthday,
      this.registerForm.value.gender,
      this.registerForm.value.profilelink
    ).then((res) => {
      this.presentToast("Registered Successfully");
      this.registerForm.reset();
      this.router.navigate(['/login'])
    })
    } 
  }

}
