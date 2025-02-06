import { useHoroscopeStore } from "@/store/useHoroscopeStore ";

export const useDailyHoroscope = (zodiac: string) => {
  return useHoroscopeStore((state) => (state.dailyHoroscopeData ? (Object.values(state.dailyHoroscopeData).find((item) => item.zodiac === zodiac) ?? null) : null));
};
