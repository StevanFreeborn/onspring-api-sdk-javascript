export class ArgumentValidator {
    public static isNullOrWhiteSpace(value: string | null | undefined): boolean {
      return value === null || value === undefined || (/^\s*$/).test(value);
    }

    public static isValidUrl(value: string | null | undefined): boolean {
      let url: URL;

      try {
        url = new URL(value);
      } catch (error) {
        return false;
      }

      return url.protocol === 'http:' || url.protocol === 'https:';
    }
}