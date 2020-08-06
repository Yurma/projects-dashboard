import { TestBed } from '@angular/core/testing';

import { NotSelectedGuard } from './not-selected.guard';

describe('NotSelectedGuard', () => {
  let guard: NotSelectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotSelectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
