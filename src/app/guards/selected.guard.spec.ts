import { TestBed } from '@angular/core/testing';

import { SelectedGuard } from './selected.guard';

describe('SelectedGuard', () => {
  let guard: SelectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
