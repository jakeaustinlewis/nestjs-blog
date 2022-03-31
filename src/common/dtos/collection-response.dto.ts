export class CollectionResponse<T> {
  public data: any = [];

  public length: number;

  public limit: number;

  public offset: number;

  constructor(data: T[], length: number, limit?: number, offset?: number) {
    this.data = data;
    this.length = length;
    this.limit = limit || 0;
    this.offset = offset || 0;
  }
}
