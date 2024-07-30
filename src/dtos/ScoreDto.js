export default class ScoreDto {
  constructor(model) {
    this.userId = model.userId;
    this.id = model._id;
    this.score = model.score;
    this.date = model.date;
  }
}
