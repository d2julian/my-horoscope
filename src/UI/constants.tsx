import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const WINDOW_WIDTH = width;
export const WINDOW_HEIGHT = height;
export const STORED_USER_NAME = "storedName";
export const STORED_ZODIAC_KEY = "storedZodiac";
export const enum LUCKY_ELEMENTS {
  Amor = "love",
  Finanzas = "money",
  Animo = "mood",
  Profesión = "job",
}

export const enum ZODIAC_ICONS {
  acuario = "zodiac-aquarius",
  aries = "zodiac-aries",
  cancer = "zodiac-cancer",
  capricornio = "zodiac-capricorn",
  escorpion = "zodiac-scorpio",
  geminis = "zodiac-gemini",
  leo = "zodiac-leo",
  libra = "zodiac-libra",
  piscis = "zodiac-pisces",
  sagitario = "zodiac-sagittarius",
  tauro = "zodiac-taurus",
  virgo = "zodiac-virgo",
}

export const enum COMPATIBILITY_ICONS {
  Amor = "heart-outline",
  Amistad = "account-check-outline",
  Profesión = "briefcase-outline",
}
