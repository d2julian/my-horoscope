import { useHoroscopeStore } from "@/store/useHoroscopeStore ";

export const useMainHoroscope = (zodiac: string) => {
  return useHoroscopeStore((state) => (state.generalHoroscopeData ? (Object.values(state.generalHoroscopeData).find((item) => item.zodiac === zodiac) ?? null) : null));
};
