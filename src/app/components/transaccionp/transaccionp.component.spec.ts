import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionpComponent } from './transaccionp.component';

describe('TransaccionpComponent', () => {
  let component: TransaccionpComponent;
  let fixture: ComponentFixture<TransaccionpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaccionpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
