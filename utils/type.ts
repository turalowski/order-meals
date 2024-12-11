export type Location = {
    lat: number;
    lng: number;
  }
  
export type Viewport = {
    northeast: Location;
    southwest: Location;
  }
  
export type Geometry = {
    location: Location;
    viewport: Viewport;
  }
  
export type Photo = {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }
  
export type OpeningHours = {
    open_now: boolean;
  }
  
export type PlusCode = {
    compound_code: string;
    global_code: string;
  }
  
export type Restaurant = {
    business_status?: string;
    geometry: Geometry;
    icon: string;
    name: string;
    opening_hours?: OpeningHours;
    photos?: Photo[];
    place_id: string;
    plus_code?: PlusCode;
    price_level?: number;
    rating?: number;
    reference: string;
    scope?: string;
    types?: string[];
    user_ratings_total?: number;
    vicinity: string;
  }

  export interface TransformedRestaurant extends Omit<Restaurant, 'photos'> {
    address: string;
    isOpenNow: boolean | undefined;
    isClosedTemporarily: boolean | undefined;
    photos: string[];
  }
  
  
export type RestaurantsResponse = {
    html_attributions: string[];
    next_page_token: string;
    results: Restaurant[];
    status: string;
  }