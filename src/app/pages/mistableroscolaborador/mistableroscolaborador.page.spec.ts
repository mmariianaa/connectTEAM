import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MistableroscolaboradorPage } from './mistableroscolaborador.page';

describe('MistableroscolaboradorPage', () => {
  let component: MistableroscolaboradorPage;
  let fixture: ComponentFixture<MistableroscolaboradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MistableroscolaboradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
