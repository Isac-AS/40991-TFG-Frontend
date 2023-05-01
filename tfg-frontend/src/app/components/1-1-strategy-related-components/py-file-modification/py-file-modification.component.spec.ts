/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PyFileModificationComponent } from './py-file-modification.component';

describe('PyFileModificationComponent', () => {
  let component: PyFileModificationComponent;
  let fixture: ComponentFixture<PyFileModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PyFileModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PyFileModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
