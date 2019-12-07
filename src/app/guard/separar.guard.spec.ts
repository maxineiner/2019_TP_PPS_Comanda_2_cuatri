import { TestBed, async, inject } from '@angular/core/testing';

import { SepararGuard } from './separar.guard';

describe('SepararGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SepararGuard]
    });
  });

  it('should ...', inject([SepararGuard], (guard: SepararGuard) => {
    expect(guard).toBeTruthy();
  }));
});
