import { Middleware } from 'telegraf';
import { SceneContext, SceneSession } from 'telegraf/typings/scenes';

export function sessionMiddleware(): Middleware<SceneContext> {
  const store = new Map<number, SceneSession>();

  return async function (context, next) {
    const id = context.from.id;

    if (!id) {
      return await next();
    }

    let session: SceneSession = { __scenes: {} };

    Object.defineProperty(context, 'session', {
      get: function () {
        return session;
      },
      set: function (newValue) {
        session = Object.assign({}, newValue);
      },
    });

    session = store.get(id) || { __scenes: {} };

    await next();

    store.set(id, session);
  };
}
