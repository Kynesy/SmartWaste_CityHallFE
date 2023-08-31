import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnUserComponent } from './warn-user.component';

describe('WarnUserComponent', () => {
  let component: WarnUserComponent;
  let fixture: ComponentFixture<WarnUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarnUserComponent]
    });
    fixture = TestBed.createComponent(WarnUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
