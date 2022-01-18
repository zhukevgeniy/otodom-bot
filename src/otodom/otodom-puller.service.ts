import { Subject } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OtodomService } from './otodom.service';

@Injectable()
export class OtodomPuller extends Subject<string[]> {
  readonly #otodomService: OtodomService;

  constructor(otodomService: OtodomService) {
    super();
    this.#otodomService = otodomService;
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  pull() {
    this.#otodomService.getFlats().subscribe((value) => {
      this.next(value);
    });
  }
}
