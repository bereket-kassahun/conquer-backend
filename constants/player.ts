
import { Card } from "./cards";

export interface Player {
  walletAmount: number;
  phoneNumber: string;
  fullName: string;
  playerNumber: number;
  isPlaying: boolean;
  cards: Card[];
  initialCard: Card | null;
}
