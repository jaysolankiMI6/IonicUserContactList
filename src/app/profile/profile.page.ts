import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  data : any; 
  bday: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.userdata) {
        this.data = JSON.parse(params.userdata);
      }
    });
    console.log('data profile ',this.data);

    let timestamp_formation = new Date(this.data.userdata.u_birthday).getTime();
    let timestamp=new Date('02/10/2016').getTime();
    let todate=new Date(timestamp).getDate();
    let tomonth=new Date(timestamp).getMonth()+1;
    let toyear=new Date(timestamp).getFullYear();
    this.bday = tomonth+'/'+todate+'/'+toyear;

  }

  openlink(link){
    console.log("link ",link);
    window.open(link,'_system', 'location=yes');
  }
}
