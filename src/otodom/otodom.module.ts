import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OtodomBot } from './otodom.bot';
import { OtodomPuller } from './otodom-puller.service';
import { OtodomService } from './otodom.service';

@Module({
  imports: [HttpModule],
  providers: [OtodomBot, OtodomPuller, OtodomService],
})
export class OtodomModule {}
