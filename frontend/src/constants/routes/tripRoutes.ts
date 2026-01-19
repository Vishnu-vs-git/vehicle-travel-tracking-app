export const TRIP_ROUTES = {
  GET_TRIPS :`/api/trip/user`,
  GET_TRIP :(tripId: string) => `/api/trip/trip-detail/${tripId}`,
  UPLOAD_TRIP :`/api/trip/upload`,
  GET_TRIP_DETAILS :(tripId :string)=> `/api/trip/${tripId}`,
  DELETE_TRIP:(tripId :string) => `/api/trip/delete/${tripId}`
}