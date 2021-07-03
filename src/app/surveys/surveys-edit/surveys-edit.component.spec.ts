import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysEditComponent } from './surveys-edit.component';

describe('SurveysEditComponent', () => {
  let component: SurveysEditComponent;
  let fixture: ComponentFixture<SurveysEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveysEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveysEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
