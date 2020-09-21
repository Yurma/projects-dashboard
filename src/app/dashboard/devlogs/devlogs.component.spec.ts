import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevlogsComponent } from './devlogs.component';

describe('DevlogsComponent', () => {
  let component: DevlogsComponent;
  let fixture: ComponentFixture<DevlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
