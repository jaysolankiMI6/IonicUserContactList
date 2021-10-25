import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactdetailPage } from './contactdetail.page';

describe('ContactdetailPage', () => {
  let component: ContactdetailPage;
  let fixture: ComponentFixture<ContactdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
