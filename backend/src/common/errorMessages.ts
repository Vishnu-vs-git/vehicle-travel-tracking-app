export const ERROR_MESSAGES = {
  USER : {
     REGISTER_FAILED : "User registration failed ",
     ALREADY_EXISTS : "User already exists",
     NOT_FOUND : "User not found",
     PASSWORD_NOT_MATCH :"Invalid Password",
     ID_REQUIRED : "Id is required",
     FILE_REQUIRED: "File is required",
     PASSWORD_EMPTY_ERROR:"Please enter the password",
     EMAIL_EMPTY_ERROR:"Please enter the email",
     EMAIL_AND_PASSWORD_EMPTY_ERROR:"Please enter the email and password",
     USER_UNAUTHORIZED: "User Unauthorized"
  },
  CSV :{
    PARSING_FAILED: "Failure in parsing csv files",
    FILE_REQUIRED : "Csv file is required",
    CSV_INVALID:"Invalid csv file",
    CSV_FILE_ERROR:"Only CSV files are allowed"
  },
  TRIP : {
     NOT_FOUND : "Trips not found",
      ID_REQUIRED : "TripId is required"
  },
  TOKEN:{
    INVALID_OR_EXPIRED:"Invalid or expired token",
    UNAUTHORIZED: "Unauthorized",
    REFRESH_TOKEN_MISSING:"Refresh Token missing",
    INVALID_REFRESH_TOKEN:"Refresh Token is Invalid",
    SESSION_EXPIRED_ERROR: "Session expired. Please login again."
  },
  ZOD:{
    VALIDATION_ERROR:"Validation Error"
  },
  COMMON:{
    INTERNAL_SERVER_ERROR:"Internal server error"
  }
}