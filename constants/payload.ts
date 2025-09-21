import {Player} from './player'

export type Actions = 'INITIATE' | 'MOVE' | 'FINISHED';

export interface Payload {
    player: Player;
    action: Actions;
}

