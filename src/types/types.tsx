import { ImageSourcePropType } from "react-native";

type Characteristic = {
  [key: string]: string;
};

export type ZodiacData = {
  all_characteristics: Characteristic[];
  attribute: string;
  dislikes: string;
  ideal: string;
  likes: string;
  personality: string;
  strengths: string;
  timestamp: string;
  url: string;
  weaknesses: string;
  zodiac: string;
  index: number;
  date_from: string;
  date_to: string;
};

export type ZodiacMainResponse = ZodiacData[];

export type Horoscope = {
  id: string;
} & ZodiacData;

export enum HttpActionKind {
  SEND = "SEND",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export type ZodiacCarouselType = {
  name: string;
  image: ImageSourcePropType;
  index: number;
};

type LuckyElement = {
  lucky_element: string;
  total_stars_empty: number;
  total_stars_filled: number;
};

type ZodiacCompatibilityElement = {
  element: string;
  zodiac_compatible: string;
};

export type HoroscopeData = {
  horoscope: string;
  index: number;
  lucky_elements: LuckyElement[];
  timestamp: string;
  url: string;
  zodiac: string;
  image: ImageSourcePropType;
  zodiac_compatibility_elements: ZodiacCompatibilityElement[];
};

export type ZodiacDailyResponse = HoroscopeData[];

export type TabRoutes = {
  key: string;
  title: string;
};

export type ZodiacCompatibilityData = {
  compatibility_info: string;
  zodiac_from: string;
  index_from: number;
  zodiac_to: string;
  index_to: number;
};

export type ZodiacCompatibility = ZodiacCompatibilityData[];
