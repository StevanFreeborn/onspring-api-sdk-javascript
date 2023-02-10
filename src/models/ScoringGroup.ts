/**
 * @class ScoringGroup - A class that represents a scoring group.
 */
export class ScoringGroup {
  /**
   * @property {string} listValueId - The id of the list value.
   */
  public listValueId: string;

  /**
   * @property {string} name - The name of the scoring group.
   */
  public name: string;

  /**
   * @property {number} score - The score of the scoring group.
   */
  public score: number;

  /**
   * @property {number} maximumScore - The maximum score of the scoring group.
   */
  public maximumScore: number;

  /**
   * @constructor - Creates a new instance of ScoringGroup.
   * @param {string} listValueId - The id of the list value.
   * @param {string} name - The name of the scoring group.
   * @param {number} score - The score of the scoring group.
   * @param {number} maximumScore - The maximum score of the scoring group.
   * @returns {ScoringGroup} - A new instance of ScoringGroup.
   */
  constructor(
    listValueId: string,
    name: string,
    score: number,
    maximumScore: number
  ) {
    this.listValueId = listValueId;
    this.name = name;
    this.score = score;
    this.maximumScore = maximumScore;
  }
}
