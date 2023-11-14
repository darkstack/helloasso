import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatorBoxComponent } from './donator-box.component';

describe('DonatorBoxComponent', () => {
  let component: DonatorBoxComponent;
  let fixture: ComponentFixture<DonatorBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonatorBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonatorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
