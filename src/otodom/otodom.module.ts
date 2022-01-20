import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OtodomBot } from './otodom.bot';
import { OtodomScrapper } from './otodom-scrapper.service';
import { OtodomService } from './otodom.service';

@Module({
  imports: [HttpModule],
  providers: [OtodomBot, OtodomScrapper, OtodomService],
})
export class OtodomModule {}
