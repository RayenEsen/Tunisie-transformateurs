/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EchaufLiquideComponent } from './Echauf-liquide.component';

describe('EchaufLiquideComponent', () => {
  let component: EchaufLiquideComponent;
  let fixture: ComponentFixture<EchaufLiquideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchaufLiquideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchaufLiquideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
