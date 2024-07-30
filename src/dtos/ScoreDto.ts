import { IScore } from "../models/Score/IScore";

export default class ScoreDto {
  userId: string;
  _id: string; 
  score: number;
  date: string;

  constructor(model: IScore) {
    this.userId = model.userId;
    this._id = model._id.toString();
    this.score = model.score;
    this.date = model.date;
  }
}