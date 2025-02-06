import { ZodiacDailyResponse } from "@/types/types";
import images from "../../assets/images/index";

function mapZodiacDailyResponseToHoroscopes(data: ZodiacDailyResponse) {
  const zodiacs: ZodiacDailyResponse = [];
  Object.values(data).map((zodiac) => {
    zodiacs.push({ ...zodiac, image: images[zodiac.zodiac] });
  });
  return zodiacs;
}

export { mapZodiacDailyResponseToHoroscopes };
