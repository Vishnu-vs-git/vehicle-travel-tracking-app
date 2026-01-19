import { apiClient } from "../api/axios";
import { TRIP_ROUTES } from "../constants/routes/tripRoutes";

export const TripService = {
  getTrips:() => apiClient.get(TRIP_ROUTES.GET_TRIPS,{withCredentials : true}),
  getTrip:(tripId :string) => apiClient.get(TRIP_ROUTES.GET_TRIP(tripId),{withCredentials : true}),
  uploadTrip:(file : File) => {
    const formData = new FormData();
    formData.append("file",file)
    return apiClient.post(TRIP_ROUTES.UPLOAD_TRIP,formData,{withCredentials: true})
  },
  getTripDetails :(tripId :string) => apiClient.get(TRIP_ROUTES.GET_TRIP_DETAILS(tripId),{withCredentials:true}),
  deleteTrip: (tripId :string) => apiClient.delete(TRIP_ROUTES.DELETE_TRIP(tripId),{withCredentials : true})

}