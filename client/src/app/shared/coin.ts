import { Wallet } from './wallet';

export class Coin {
  id: number;
  code: string;
  link: string;
  coordinates: Coordinates;
  wallet: Wallet;
  claimed: boolean;
  active: boolean;
  value: number;
  virality: number;
}
