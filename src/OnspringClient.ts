import { AxiosInstance } from "axios";
import axios from "axios";
import { ArgumentValidator } from "./models/ArgumentValidator";

export class OnspringClient {
  protected readonly client: AxiosInstance;

  constructor(baseUrl: string | undefined | null, apiKey: string | undefined | null) {
    if (ArgumentValidator.isValidUrl(baseUrl) === false) {
      throw new Error("baseUrl must be an absolute and well-formed URI.");
    }

    if (ArgumentValidator.isNullOrWhiteSpace(apiKey)) { 
      throw new Error("apiKey cannot be null/empty/whitespace.");
    }

    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "x-apikey": apiKey,
        "x-api-version": "2",
      },
    });
  }
}