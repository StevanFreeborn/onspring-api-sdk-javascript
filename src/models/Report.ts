/**
 * @class Report - Represents a report.
 */
export class Report {
  /**
   * @property {number} appId - The id of the app.
   */
  public appId: number;

  /**
   * @property {number} id - The id of the report.
   */
  public id: number;

  /**
   * @property {string} name - The name of the report.
   */
  public name: string;

  /**
   * @property {string} description - The description of the report.
   */
  public description: string;

  /**
   * @constructor - Creates a new instance of the Report class.
   */
  constructor(appId: number, id: number, name: string, description: string) {
    this.appId = appId;
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
