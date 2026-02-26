import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuthToast?: boolean;
  }
}