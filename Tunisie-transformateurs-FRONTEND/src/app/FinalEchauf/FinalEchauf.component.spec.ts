/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FinalEchaufComponent } from './FinalEchauf.component';

describe('FinalEchaufComponent', () => {
  let component: FinalEchaufComponent;
  let fixture: ComponentFixture<FinalEchaufComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalEchaufComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalEchaufComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
