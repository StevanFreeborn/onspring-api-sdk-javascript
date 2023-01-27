/**
 * @class App - Model for the App object
 */
export class App {
  /**
   * @property {string} href - The URL to the app
   */
  href: string;

  /**
   * @property {number} id - The id of the app
   */
  id: number;

  /**
   * @property {string} name - The name of the app
   */
  name: string;

  /**
   * @constructor - Creates a new instance of the App class.
   * @param {string} href - The URL to the app
   * @param {number} id - The id of the app
   * @param {string} name - The name of the app
   * @returns {App} - A new instance of the App class.
   */
  constructor(href: string, id: number, name: string) {
    this.href = href;
    this.id = id;
    this.name = name;
  }
}
