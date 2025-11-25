import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaspendientesPage } from './tareaspendientes.page';

describe('TareaspendientesPage', () => {
  let component: TareaspendientesPage;
  let fixture: ComponentFixture<TareaspendientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaspendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
