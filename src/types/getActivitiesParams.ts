export interface GetActivitiesParams {
  category?: string;
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
  method?: "offset" | "cursor";
}
