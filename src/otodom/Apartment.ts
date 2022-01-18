interface ListingParamDTO {
  key: string;
  position: number;
  top_hide: boolean;
  value: string;
}

interface ApartmentPhoto {
  [key: number]: string;
}

export interface ApartmentDTO {
  age: number;
  category_id: string;
  city_label: string;
  created: string;
  hide_price: boolean;
  id: string;
  list_label: string;
  listing_params: ListingParamDTO[];
  map_lat: string;
  map_lon: string;
  map_show_detailed: number;
  photos: ApartmentPhoto[];
  title: string;
}

export interface ApartmentResponseDTO {
  ads_on_page: number;
  is_compact: number;
  observed_id: string[] | null;
  page: number;
  total_ads: number;
  total_pages: number;
  view: string;
  ads: ApartmentDTO[];
}

export interface ConcreteApartmentDTO {
  id: string;
  url: string;
  preview_url: string;
  title: string;
  created: string;
  age: number;
  description: string;
  description_raw: string;
  highlighted: number;
  urgent: number;
  topAd: number;
  category_id: number;
  params: unknown[];
  subtitle: unknown[];
  business: number;
  hide_user_ads_button: number;
  status: string;
  city_label: string;
  header_city_label: string;
  has_phone: number;
  has_email: number;
  has_sms: boolean;
  map_zoom: string;
  map_lat: string;
  map_lon: string;
  map_radius: number;
  map_show_detailed: boolean;
  person: string;
  user_label: string;
  user_ads_id: string;
  user_id: string;
  numeric_user_id: number;
  user_ads_url: string;
  list_label: string;
  list_label_ad: string;
  photos: unknown[];
  extra: Record<string, unknown>;
  form_id: string;
  ad_packages: string;
  m: string;
  rooms_num: string;
}
