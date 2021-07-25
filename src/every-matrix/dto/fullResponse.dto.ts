import { IRobotics } from 'src/utilities/roboticsTypes';

export class FullResponseDTO {
  constructor(values: IRobotics[], slotsCatalogGame: IRobotics[]) {
    this.values = values;
    this.slotsCatalogGame = slotsCatalogGame;
  }
  values: IRobotics[];
  slotsCatalogGame: IRobotics[];
}
