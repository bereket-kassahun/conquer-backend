import { Payload } from "../constants/payload";
import { Player } from '../constants/player'

function isMyInterface(obj: any): obj is Payload {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.player === 'object' &&
        typeof obj.name === 'string'
    );
}

export function parseJson(json: string) {
    const obj = JSON.parse(json);
    if (isMyInterface(obj)) {
        return obj;
    } else {
        throw new Error('Invalid JSON format');
    }
}
