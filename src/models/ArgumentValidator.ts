/**
 * @class ArgumentValidator - A class that validates arguments.
 */
export class ArgumentValidator {
  /**
   * @method isNullOrWhiteSpace - Determines if the value is null, undefined, or a string that contains only whitespace characters.
   * @param {string} value - The value to validate.
   * @returns {boolean} - True if the value is null, undefined, or a string that contains only whitespace characters; otherwise, false.
   */
  public static isNullOrWhiteSpace(value: string | null | undefined): boolean {
    return value === null || value === undefined || /^\s*$/.test(value);
  }

  /**
   * @method isValidUrl - Determines if the value is a valid URL.
   * @param {string} value - The value to validate.
   * @returns {boolean} - True if the value is a valid URL; otherwise, false.
   */
  public static isValidUrl(value: string | null | undefined): boolean {
    let url: URL;

    if (value === null || value === undefined) {
      return false;
    }

    try {
      url = new URL(value);
    } catch (error) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  /**
   * @method isValidPageSize - Determines if the value is a valid page size.
   * @param {number} value - The value to validate.
   * @returns {boolean} - True if the value is a valid page size; otherwise, false.
   * @remarks - A valid page size is a number greater than 0 and less than or equal to 1000.
   */
  public static isValidPageSize(value: number | null | undefined): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    return value > 0 && value <= 1000;
  }

  /**
   * @method isValidPageNumber - Determines if the value is a valid page number.
   * @param {number} value - The value to validate.
   * @returns {boolean} - True if the value is a valid page number; otherwise, false.
   * @remarks - A valid page number is a number greater than 0.
   */
  public static isValidPageNumber(value: number | null | undefined): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    return value > 0;
  }
}
