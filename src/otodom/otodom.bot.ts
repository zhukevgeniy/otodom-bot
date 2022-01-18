import { Scenes } from 'telegraf';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { OtodomPuller } from './otodom-puller.service';
import { diff } from '../utils/diff';

@Update()
export class OtodomBot {
  readonly #otodomPuller: OtodomPuller;

  constructor(otodomPuller: OtodomPuller) {
    this.#otodomPuller = otodomPuller;
  }

  @Start()
  async start(@Ctx() ctx: Scenes.SceneContext) {
    this.#otodomPuller.subscribe(async (apartmentURLs) => {
      // @ts-ignore
      const targetURLs = diff(apartmentURLs, ctx.session.apartmentURLs || []);

      for (const targetURL of targetURLs) {
        await ctx.reply(targetURL);
      }

      // @ts-ignore
      ctx.session.apartmentURLs = apartmentURLs;
    });
  }
}
