import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcrDialogComponent } from './tcr-dialog.component';

describe('TcrDialogComponent', () => {
  let component: TcrDialogComponent;
  let fixture: ComponentFixture<TcrDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcrDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
