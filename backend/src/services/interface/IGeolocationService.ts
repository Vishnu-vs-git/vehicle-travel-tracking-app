export interface IGeoLocationService {
  
  reverseGeocode(latitude: number, longitude: number): Promise<string>;
}
