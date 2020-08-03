import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

@Injectable()
export class UserResolve implements Resolve<string> {
  constructor() {}

  resolve() {
    return 'true';
  }
}
