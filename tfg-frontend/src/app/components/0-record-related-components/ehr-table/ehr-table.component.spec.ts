/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EhrTableComponent } from './ehr-table.component';

describe('EhrTableComponent', () => {
  let component: EhrTableComponent;
  let fixture: ComponentFixture<EhrTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhrTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
