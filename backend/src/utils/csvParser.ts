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
      let headersValidated = false;

      fs.createReadStream(path)
        .pipe(csv())
        .on("headers", (headers) => {
          const requiredHeaders = [
            "latitude",
            "longitude",
            "timestamp",
            "ignition",
          ];

          const isValid = requiredHeaders.every(h =>
            headers.includes(h)
          );

          if (!isValid) {
            reject(new Error("Invalid CSV headers"));
          }

          headersValidated = true;
        })
        .on("data", (data) => {
          const latitude = Number(data.latitude);
          const longitude = Number(data.longitude);

          if (
            Number.isNaN(latitude) ||
            Number.isNaN(longitude) ||
            !data.timestamp
          ) {
            return; // skip invalid row
          }

          rows.push({
            latitude,
            longitude,
            timestamp: data.timestamp,
            ignition:
              String(data.ignition).toLowerCase() === "on" ||
              String(data.ignition).toLowerCase() === "true" ||
              String(data.ignition).toLowerCase() === "1",
          });
        })
        .on("end", () => {
          if (!headersValidated || rows.length === 0) {
            reject(new Error("CSV file is empty or invalid"));
          }
          resolve(rows);
        })
        .on("error", reject);
    });
  }
}
