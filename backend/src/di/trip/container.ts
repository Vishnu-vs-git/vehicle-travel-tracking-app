import { TripController } from "../../controllers/tripController";
import { GpsFactory } from "../../factories/implementation/GpsFactory";
import { TripFactory } from "../../factories/implementation/TripFactory";
import { GpsMapper } from "../../mapper/implementation/GpsMapper";
import { TripMapper } from "../../mapper/implementation/TripMapper";
import { GpsRepository } from "../../repositories/implementation/GpsRepository";
import { TripRepository } from "../../repositories/implementation/TripRepository";
import { GeoLocationService } from "../../services/implementations/GeoLocationService";
import { TripService } from "../../services/implementations/TripService";

const tripFactory = new TripFactory();
const tripRepository = new TripRepository(tripFactory);

const tripMapper = new TripMapper();
const gpsMapper = new GpsMapper();

const gpsFactory   = new GpsFactory();
const gpsRepository = new GpsRepository(gpsFactory);
const geoLocationService = new GeoLocationService();

const tripService = new TripService(tripRepository, tripMapper, gpsMapper,gpsRepository,geoLocationService);
export const tripController = new TripController(tripService);