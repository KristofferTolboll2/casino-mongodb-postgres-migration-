export class SearchEveryMatrixDTO {
  Id: number;
  ReferenceName: string;

  constructor(gameId: number, name: string) {
    this.Id = gameId;
    this.ReferenceName = name;
  }
}
