import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KayitPage } from './kayit.page';

describe('KayitPage', () => {
  let component: KayitPage;
  let fixture: ComponentFixture<KayitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KayitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KayitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
