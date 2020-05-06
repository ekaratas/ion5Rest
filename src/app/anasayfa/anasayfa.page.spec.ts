import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnasayfaPage } from './anasayfa.page';

describe('AnasayfaPage', () => {
  let component: AnasayfaPage;
  let fixture: ComponentFixture<AnasayfaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnasayfaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnasayfaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
