import { Injectable } from '@nestjs/common';
import { IndividType } from 'src/utils/types/individ-type';

@Injectable()
export class IndividsService {
  private fakeIndivids: IndividType[] = [
    { username: 'Joe', email: 'joe@gmail.com' },
    { username: 'John', email: 'john@gmail.com' },
  ];
  fetchIndivids() {
    return this.fakeIndivids;
  }
  createIndivid(individ: IndividType) {
    this.fakeIndivids.push(individ);
  }

  findIndividById(id: number): IndividType {
    return this.fakeIndivids[id];
  }
}
