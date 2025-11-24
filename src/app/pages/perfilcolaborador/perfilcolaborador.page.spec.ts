import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilcolaboradorPage } from './perfilcolaborador.page';

describe('PerfilcolaboradorPage', () => {
  let component: PerfilcolaboradorPage;
  let fixture: ComponentFixture<PerfilcolaboradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilcolaboradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
