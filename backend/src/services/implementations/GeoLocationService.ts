import axios, { AxiosInstance } from "axios";
import { IGeoLocationService } from "../interface/IGeolocationService";
import dotenv from "dotenv";
dotenv.config();

export class GeoLocationService implements IGeoLocationService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL:process.env.GEO_LOCATION_URL! ,
      headers: {
        "User-Agent": "trip-tracker-app",
      },
      timeout: 5000,
    });
  }

  async reverseGeocode(
    latitude: number,
    longitude: number
  ): Promise<string> {
    try {
      const response = await this.client.get("/reverse", {
        params: {
          lat: latitude,
          lon: longitude,
          format: "json",
        },
      });

      const address = response.data?.address;

      return (
        address?.city ||
        address?.town ||
        address?.village ||
        address?.state ||
        "Unknown"
      );
    } catch  {
      
      return "Unknown";
    }
  }
}
