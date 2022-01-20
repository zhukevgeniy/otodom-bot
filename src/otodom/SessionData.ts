import { SceneSessionData } from 'telegraf/typings/scenes';

export interface SessionData extends SceneSessionData {
  apartmentURLs: string[];
}
