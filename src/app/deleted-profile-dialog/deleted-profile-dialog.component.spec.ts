import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedProfileDialogComponent } from './deleted-profile-dialog.component';

describe('DeletedProfileDialogComponent', () => {
  let component: DeletedProfileDialogComponent;
  let fixture: ComponentFixture<DeletedProfileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedProfileDialogComponent]
    });
    fixture = TestBed.createComponent(DeletedProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
