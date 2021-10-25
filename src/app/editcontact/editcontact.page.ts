import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-editcontact',
  templateUrl: './editcontact.page.html',
  styleUrls: ['./editcontact.page.scss'],
})
export class EditcontactPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private db: DbService,
    private actRoute: ActivatedRoute) { }
  data: any;

  cdata = {
    name: '',
    email: '',
    number: ''
  };

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.contactdata) {
        this.data = JSON.parse(params.contactdata);
      }
    });
    console.log("user contact data ", this.data);
    this.cdata.name = this.data.u_name;
    this.cdata.email = this.data.u_email;
    this.cdata.number = this.data.u_phonenumber;
  }

  updateContact() {
    this.db.updateContact(this.data.id, this.cdata)
      .then((res) => {
        console.log(res)
        this.router.navigate(['/home']);
      })
  }
} 
