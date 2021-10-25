import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditcontactPage } from './editcontact.page';

describe('EditcontactPage', () => {
  let component: EditcontactPage;
  let fixture: ComponentFixture<EditcontactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcontactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditcontactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
