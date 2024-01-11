/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Add_ModifyTransformateurComponent } from './Add_Modify-Transformateur.component';

describe('Add_ModifyTransformateurComponent', () => {
  let component: Add_ModifyTransformateurComponent;
  let fixture: ComponentFixture<Add_ModifyTransformateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Add_ModifyTransformateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add_ModifyTransformateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
