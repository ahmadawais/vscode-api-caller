import fetch from 'node-fetch';

export interface ApiData {
  method: string;
  url: string;
  body?: any;
  headers?: any;
}

const DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};

export class Fetcher {

  public static async call(apiData: ApiData) {
    const { method, url, body, headers } = apiData;

    try {
      if (method === 'GET') {
        return await fetch(url, {
          method,
          headers: {
            ...DEFAULT_HEADERS,
            ...headers
          },
        });
      } else if (method === 'POST') {
        return await fetch(url, {
          method,
          body,
          headers: {
            ...DEFAULT_HEADERS,
            ...headers
          },
        });
      } else {
        return 'Method not supported';
      }
    } catch (error: any) {
      return error.message || error;
    }
  }
}