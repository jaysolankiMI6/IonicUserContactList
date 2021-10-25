import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-contactdetail',
  templateUrl: './contactdetail.page.html',
  styleUrls: ['./contactdetail.page.scss'],
})
export class ContactdetailPage implements OnInit {
  data: any;
  constructor(private router: Router, private route: ActivatedRoute,
    private db: DbService,
    private toast: ToastController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.contactdata) {
        this.data = JSON.parse(params.contactdata);
      }
    });
    console.log("user contact data ", this.data);
  }
  EditContact() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        contactdata: JSON.stringify(this.data)
      }
    };
    this.router.navigate(['editcontact'], navigationExtras);
  }

  async deleteContact() {
    const actionSheet = await this.actionSheetController.create({
      header: "Are you sure want to delete contact",
      buttons: [{
        text: 'Delete',
        handler: () => {
          this.db.deleteContact(this.data.id).then(async (res) => {
            let toast = await this.toast.create({
              message: 'Contact deleted',
              duration: 2500
            });
            toast.present();
          })
          this.router.navigate(['/home']);
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
