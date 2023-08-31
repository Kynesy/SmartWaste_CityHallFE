import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnAdminComponent } from './warn-admin.component';

describe('WarnAdminComponent', () => {
  let component: WarnAdminComponent;
  let fixture: ComponentFixture<WarnAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarnAdminComponent]
    });
    fixture = TestBed.createComponent(WarnAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
