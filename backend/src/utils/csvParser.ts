import fs from "fs";
import csv from "csv-parser";

export interface CsvGpsRow {
  latitude: number;
  longitude: number;
  timestamp: string;
  ignition: boolean;
  tripId?:string
}

export class ParseCsv {
  static parse(path: string): Promise<CsvGpsRow[]> {
    return new Promise((resolve, reject) => {
      const rows: CsvGpsRow[] = [];

      fs.createReadStream(path)
        .pipe(csv())
        .on("data", (data) => {
          rows.push({
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
            timestamp: data.timestamp,
            ignition:
              String(data.ignition).toLowerCase()=== "on" ||
              String(data.ignition).toLowerCase() === "true" ||
              String(data.ignition).toLowerCase() === "1",
           

          });
        })
        .on("end", () => {
          resolve(rows);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}
