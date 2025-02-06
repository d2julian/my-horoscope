import { ZodiacCarouselType, ZodiacMainResponse } from "@/types/types";
import images from "../../assets/images/index";

function mapZodiacMainResponseToHoroscopes(data: ZodiacMainResponse): ZodiacCarouselType[] {
  const zodiacs: ZodiacCarouselType[] = [];
  Object.keys(data)
    .sort((keyB, keyA) => data[keyB].index - data[keyA].index)
    .map((key) => {
      return zodiacs.push({
        name: data[key].zodiac,
        image: images[data[key].zodiac],
        index: data[key].index,
      });
    });
  return zodiacs;
}

export { mapZodiacMainResponseToHoroscopes };
