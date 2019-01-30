import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinEditComponent } from './coin-edit.component';

describe('CoinEditComponent', () => {
  let component: CoinEditComponent;
  let fixture: ComponentFixture<CoinEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
