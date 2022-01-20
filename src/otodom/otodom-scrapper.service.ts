import { Subject } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OtodomService } from './otodom.service';

@Injectable()
export class OtodomScrapper extends Subject<string[]> {
  readonly #otodomService: OtodomService;

  constructor(otodomService: OtodomService) {
    super();
    this.#otodomService = otodomService;
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  scrap() {
    this.#otodomService.getApartments().subscribe((apartmentURLs) => {
      this.next(apartmentURLs);
    });
  }
}
