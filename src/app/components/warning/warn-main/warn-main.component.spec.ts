import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnMainComponent } from './warn-main.component';

describe('WarnMainComponent', () => {
  let component: WarnMainComponent;
  let fixture: ComponentFixture<WarnMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarnMainComponent]
    });
    fixture = TestBed.createComponent(WarnMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
