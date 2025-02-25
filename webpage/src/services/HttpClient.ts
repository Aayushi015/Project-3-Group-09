import axios, { AxiosInstance, AxiosResponse } from "axios";

export const API_BASE_URL = "https://leonardojrr.pythonanywhere.com/api";

export enum PollutantType {
  O3,
  SO2,
  NO2,
  CO,
}

export interface SearchParams {
  // Location parameters
  state?: string;
  county?: string;
  city?: string;
  latitude?: number;
  longitude?: number;

  // Date parameters
  year?: number;
  month?: number;
  day?: number;

  // Pollution parameters
  aqi?: number;
  mean?: number;
  max_value?: number;
  max_hour?: number;
}


function pollutantURL(pt:PollutantType): string{

  let url = "/pollutant";
  switch (pt) {
    case PollutantType.O3: {
      url = url + "/o3";
      break;
    }
    case PollutantType.SO2: {
      url = url + "/so2";
      break;
    }

    case PollutantType.NO2: {
      url = url + "/no2";
      break;
    }
    case PollutantType.CO: {
      url = url + "/co";
      break;
    }
  }
  return url
}

export interface PollutantInfo {
  id: number;
  location: {
    state: string;
    county: string;
    city: string;
    latitude: number;
    longitude: number;
  };

  year: number;
  month: number;
  day: number;

  aqi: number;
  mean: number;
  max_value: number;
  max_hour: number;
}

export class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000, // 10 seconds timeout
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Method to fetch states
  public async get_states(): Promise<{ id: number; state: String }[]> {
    try {
      const response: AxiosResponse = await this.client.get("/states");
      return response.data;
    } catch (error) {
      console.error("Error in get_states:", error);
      throw error;
    }
  }

  // Method to fetch states
  public async get_counties(): Promise<{ id: number; county: String }[]> {
    try {
      const response: AxiosResponse = await this.client.get("/counties");
      return response.data;
    } catch (error) {
      console.error("Error in get_states:", error);
      throw error;
    }
  }

  // Method to fetch cities
  public async get_cities(): Promise<{ id: number; city: String }[]> {
    try {
      const response: AxiosResponse = await this.client.get("/cities");
      return response.data;
    } catch (error) {
      console.error("Error in get_cities:", error);
      throw error;
    }
  }

  
  // Method to fetch timelines
  public async get_pollutant_timeline(pollutant: PollutantType): Promise<any> {
    let url = pollutantURL(pollutant)
    url = url + "/timeline"

    try {
      const response: AxiosResponse = await this.client.get(url);
      return response.data;
    } catch (error) {
      console.error("Error in get_cities:", error);
      throw error;
    }
  }

   // Method to fetch cleanest cities
   public async get_pollutant_cleanest_cities(pollutant: PollutantType): Promise<any> {
    let url = pollutantURL(pollutant)
    url = url + "/top_cleanest_cities"

    try {
      const response: AxiosResponse = await this.client.get(url);
      return response.data;
    } catch (error) {
      console.error("Error in get_cities:", error);
      throw error;
    }
  }

    // Method to fetch dirtiest cities
    public async get_pollutant_dirtiest_cities(pollutant: PollutantType): Promise<any> {
      let url = pollutantURL(pollutant)
      url = url + "/top_dirtiest_cities"
  
      try {
        const response: AxiosResponse = await this.client.get(url);
        return response.data;
      } catch (error) {
        console.error("Error in get_cities:", error);
        throw error;
      }
    }



  // Method to fetch pollutants information
  public async get_pollutants_info(
    searchParams: SearchParams,
    pollutant: PollutantType
  ): Promise<PollutantInfo[]> {
    let url = pollutantURL(pollutant)

    try {
      const response: AxiosResponse = await this.client.get(url, {
        params: searchParams, // Axios serializes this object into query parameters
      });
      return response.data;
    } catch (error) {
      console.error("Error in get_Pollutants_info:", error);
      throw error;
    }
  }
}
