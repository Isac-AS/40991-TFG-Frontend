/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EhrMessageViewComponent } from './ehr-message-view.component';

describe('EhrMessageViewComponent', () => {
  let component: EhrMessageViewComponent;
  let fixture: ComponentFixture<EhrMessageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhrMessageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhrMessageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
