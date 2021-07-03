import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysAdminComponent } from './surveys-admin.component';

describe('SurveysAdminComponent', () => {
  let component: SurveysAdminComponent;
  let fixture: ComponentFixture<SurveysAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveysAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveysAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
