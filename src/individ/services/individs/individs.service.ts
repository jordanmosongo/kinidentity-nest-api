import { Injectable } from '@nestjs/common';

@Injectable()
export class IndividsService {
  private fakeIndivids = [{ name: 'John', lastname: 'Doe' }];
  fetchIndivids() {
    return this.fakeIndivids;
  }
}
