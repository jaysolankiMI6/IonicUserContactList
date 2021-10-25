//home.page.ts

import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { MenuController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Contact } from '../services/contact';

// const STORAGE_KEY = 'my_images';

declare var cordova: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  mainForm: FormGroup;
  private win: any = window;
  userdata: any;
  data: any;
  Data: any[] = []
  images = [];
  imagename: any;
  Imagename: any;
  targetImage2: any;
  backButtonSubscription;
  username: any;
  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private camera: Camera,
    private file: File,
    private http: HttpClient,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private storage: Storage,
    private platform: Platform,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,
    private filePath: FilePath,
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private nativeStorage: NativeStorage
  ) { }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(true, 'end');
  }

  ngOnDestroy() {
    this.Data = null;
    this.backButtonSubscription.unsubscribe();
  }
  ngOnInit() {
    // this.Data = [];
    this.route.queryParams.subscribe(params => {
      if (params && params.userdata) {
        this.data = JSON.parse(params.username);
        this.userdata = JSON.parse(params.userdata);
      }
    });
    console.log("userdata uid ", this.userdata);
    this.nativeStorage.getItem("user").then(res => {
      console.log('res ', res);
      this.data = res;
      this.username = res.userdata.u_name;
    }).catch(error => {
      this.route.queryParams.subscribe(params => {
        if (params && params.userdata) {
          this.data = JSON.parse(params.userdata);
          this.username = JSON.parse(params.username);
        }
      });
    });

    // this.db.dbState().subscribe((res) => {
    //   if (res) {
    //     this.db.fetchSongs().subscribe(item => {
    //       this.Data = item
    //       console.log("daat ",item);
    //     })
    //   }
    // });
    // this.Data = [];
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchContacts().subscribe(item => {
          let data = item;
          this.Data = [];
          console.log("contacts all ",this.Data);

          data.forEach(element => {
            if (element.u_id == this.userdata.id) {
              this.Data.push(element);
            }
          });
          console.log("contacts all ",this.Data);
        })
      }
    });

    // this.db.dbState().subscribe((res) => {
    //   if (res) {
    //     console.log('this.data.id ', this.userdata.id)
    //     this.db.getContactsOfUser(this.userdata.id)
    //       .then((result: any) => {
    //         console.log("contact list ", result);
    //         this.Data = result;
    //       });
    //     console.log("contact list of perticular user ", this.Data);

    //     this.mainForm = this.formBuilder.group({
    //       desc: ['']
    //     })
    //   }
    // });
  }
  openProfile(){
    console.log("data ",this.data);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userdata: JSON.stringify(this.data)
      }
    };
    this.router.navigate(['profile'], navigationExtras);
  }
  gotoContact(data) {
    console.log('data',data);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        contactdata: JSON.stringify(data)
      }
    };
    this.router.navigate(['contactdetail'], navigationExtras);
  }
 
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  addContact() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userdata: JSON.stringify(this.userdata)
      }
    };
    this.router.navigate(['add-contact'], navigationExtras);
  }

  loadStoredImages() {
    // this.storage.get(STORAGE_KEY).then(images => {
    //   if (images) {
    //     let arr = JSON.parse(images);
    //     this.images = [];
    //     for (let img of arr) {
    //       let filePath = this.file.dataDirectory + img;
    //       let resPath = this.pathForImage(filePath);
    //       this.images.push({ name: img, path: resPath, filePath: filePath });
    //     }
    //   }
    // });
  }



  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.imagename = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.imagename = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    });
  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      let lastImage = newFileName;
      this.Imagename = newFileName;
      var targetPath = this.pathForImage(lastImage);
      this.targetImage2 = this.win.Ionic.WebView.convertFileSrc(this.pathForImage(lastImage));
      console.log('last image ', lastImage);
      console.log('targetPath ', targetPath);
      console.log('targetPath ', this.targetImage2);
      this.updateStoredImages(newFileName);
      // this.storeData();
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      // let converted = this.webview.convertFileSrc(img);
      let converted = cordova.file.dataDirectory + img;
      return converted;
    }
  }
  updateStoredImages(name) {
    // this.storage.get(STORAGE_KEY).then(images => {
    //   let arr = JSON.parse(images);
    //   if (!arr) {
    //     let newImages = [name];
    //     this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
    //   } else {
    //     arr.push(name);
    //     this.storage.set(STORAGE_KEY, JSON.stringify(arr));
    //   }

    //   let filePath = this.file.dataDirectory + name;
    //   let resPath = this.pathForImage(filePath);

    //   let newEntry = {
    //     name: name,
    //     path: resPath,
    //     filePath: filePath
    //   };

    //   this.images = [newEntry, ...this.images];
    //   this.ref.detectChanges(); // trigger change detection cycle
    // });
  }

  // storeData() {
  //   this.db.addSong(
  //     this.mainForm.value.artist,
  //     this.mainForm.value.song
  //   ).then((res) => {
  //     this.mainForm.reset();
  //   })
  // }

  storeData() {
    let filePath = this.file.dataDirectory + name;
    let resPath = this.pathForImage(filePath);
    console.log("filepath ", filePath);
    console.log('respath ', resPath);
    this.db.addSong(
      this.mainForm.value.desc,
      this.targetImage2
    ).then((res) => {
      this.imagename = null;
      this.Imagename = null;
      this.targetImage2 = null;
      this.mainForm.reset();
    })
  }

  async deleteSong(id) {
    const actionSheet = await this.actionSheetController.create({
      header: "Are you sure want to delete photo",
      buttons: [{
        text: 'Delete',
        handler: () => {
          this.db.deleteSong(id).then(async (res) => {
            let toast = await this.toast.create({
              message: 'Image deleted',
              duration: 2500
            });
            toast.present();
          })
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

}