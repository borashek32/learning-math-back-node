"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScoreDto {
    constructor(model) {
        this.userId = model.userId;
        this._id = model._id.toString();
        this.score = model.score;
        this.date = model.date;
    }
}
exports.default = ScoreDto;
