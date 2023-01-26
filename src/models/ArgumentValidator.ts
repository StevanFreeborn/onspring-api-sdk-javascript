/**
 * @class ArgumentValidator - A class that validates arguments.
 */
export class ArgumentValidator {
  /**
   * @param {string} value - The value to validate.
   * @returns {boolean} - True if the value is null, undefined, or a string that contains only whitespace characters; otherwise, false.
   */
  public static isNullOrWhiteSpace(value: string | null | undefined): boolean {
    return value === null || value === undefined || /^\s*$/.test(value);
  }

  /**
   * @param {string} value - The value to validate.
   * @returns {boolean} - True if the value is a valid URL; otherwise, false.
   */
  public static isValidUrl(value: string | null | undefined): boolean {
    let url: URL;

    try {
      url = new URL(value);
    } catch (error) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  /**
   * @param {number} value - The value to validate.
   * @returns {boolean} - True if the value is a valid page size; otherwise, false.
   * @remarks - A valid page size is a number greater than 0 and less than or equal to 1000.
   */
  public static isValidPageSize(value: number): boolean {
    return value > 0 && value <= 1000;
  }

  /**
   * @param {number} value - The value to validate.
   * @returns {boolean} - True if the value is a valid page number; otherwise, false.
   * @remarks - A valid page number is a number greater than 0.
   */
  public static isValidPageNumber(value: number): boolean {
    return value > 0;
  }
}
