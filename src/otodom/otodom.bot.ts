import { Scenes } from 'telegraf';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { OtodomScrapper } from './otodom-scrapper.service';
import { SessionData } from './SessionData';
import { diff } from '../utils/diff';

@Update()
export class OtodomBot {
  readonly #otodomScrapper: OtodomScrapper;

  constructor(otodomScrapper: OtodomScrapper) {
    this.#otodomScrapper = otodomScrapper;
  }

  @Start()
  async start(@Ctx() ctx: Scenes.SceneContext<SessionData>) {
    this.#otodomScrapper.subscribe(async (apartmentURLs) => {
      const targetURLs = diff(
        apartmentURLs,
        ctx.session.__scenes.apartmentURLs || [],
      );

      for (const targetURL of targetURLs) {
        await ctx.reply(targetURL);
      }

      ctx.session.__scenes.apartmentURLs = apartmentURLs;
    });
  }
}
