import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablerosPage } from './tableros.page';

describe('TablerosPage', () => {
  let component: TablerosPage;
  let fixture: ComponentFixture<TablerosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TablerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
