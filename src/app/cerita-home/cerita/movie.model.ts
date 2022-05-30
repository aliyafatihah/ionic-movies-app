export class Movie {
  constructor(
    public id: string,
    public title: string,
    public year: string,
    public image: string,
    public plot?: string,
    public rating?: string,
    public actors?: string,
    public director?: string,
    public genre?: string,
    public language?: string
  ){}
}
