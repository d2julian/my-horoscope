import { create, StateCreator } from "zustand";
import { ZodiacDailyResponse, HttpActionKind, ZodiacCarouselType, ZodiacMainResponse, ZodiacCompatibility } from "@/types/types";
import { mapZodiacMainResponseToHoroscopes } from "@/selectors/mapZodiacMainResponse";
import { mapZodiacDailyResponseToHoroscopes } from "@/selectors/mapZodiacDailyResponse";

type GeneralInfoStoreType = {
  setMainZodiac: (zodiac: string) => void;
  setUserName: (name: string) => void;
  userName: string | null;
  mainZodiac: string | null;
};

type MainHoroscopeStoreType = {
  sendMainRequest: (requestFunction: () => Promise<ZodiacMainResponse>) => Promise<void>;
  errorMessage?: string;
  generalHoroscopeData: ZodiacMainResponse | null;
  zodiacs: ZodiacCarouselType[];
  error: string | null;
  status: HttpActionKind | null;
};

type DailyHoroscopeStoreType = {
  sendDailyRequest: (requestFunction: () => Promise<ZodiacDailyResponse>) => Promise<void>;
  errorMessage?: string;
  dailyHoroscopeData: ZodiacDailyResponse | null;
  error: string | null;
  status: HttpActionKind | null;
};

type CompatibilityHoroscopeStoreType = {
  sendCompatibilityRequest: (requestFunction: () => Promise<ZodiacCompatibility>) => Promise<void>;
  errorMessage?: string;
  compatibilityInfo: ZodiacCompatibility | null;
  error: string | null;
  status: HttpActionKind | null;
};

const createGeneralHoroscopeSlice: StateCreator<
  MainHoroscopeStoreType & GeneralInfoStoreType & DailyHoroscopeStoreType & CompatibilityHoroscopeStoreType,
  [],
  [],
  GeneralInfoStoreType
> = (set) => ({
  userName: null,
  mainZodiac: null,
  setUserName: (name: string) => {
    set({ userName: name });
  },
  setMainZodiac: (zodiac: string) => {
    set({ mainZodiac: zodiac });
  },
});

const createMainHoroscopeSlice: StateCreator<
  MainHoroscopeStoreType & GeneralInfoStoreType & DailyHoroscopeStoreType & CompatibilityHoroscopeStoreType,
  [],
  [],
  MainHoroscopeStoreType
> = (set) => ({
  generalHoroscopeData: null,
  error: null,
  status: null,
  zodiacs: [],

  sendMainRequest: async (requestFunction: () => Promise<ZodiacMainResponse>) => {
    set({ status: HttpActionKind.PENDING, error: null, generalHoroscopeData: null });

    try {
      const responseData = await requestFunction();
      set({
        generalHoroscopeData: Object.values(responseData),
        zodiacs: mapZodiacMainResponseToHoroscopes(responseData),
        status: HttpActionKind.COMPLETED,
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      set({ error: errorMessage, status: HttpActionKind.COMPLETED });
    }
  },
});

const createDailyHoroscopeSlice: StateCreator<
  MainHoroscopeStoreType & GeneralInfoStoreType & DailyHoroscopeStoreType & CompatibilityHoroscopeStoreType,
  [],
  [],
  DailyHoroscopeStoreType
> = (set) => ({
  dailyHoroscopeData: null,
  error: null,
  status: null,

  sendDailyRequest: async (requestFunction: () => Promise<ZodiacDailyResponse>) => {
    set({ status: HttpActionKind.PENDING, error: null, dailyHoroscopeData: null });

    try {
      const responseData = await requestFunction();
      set({
        dailyHoroscopeData: mapZodiacDailyResponseToHoroscopes(responseData),
        status: HttpActionKind.COMPLETED,
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      set({ error: errorMessage, status: HttpActionKind.COMPLETED });
    }
  },
});

const createCompatibilityHoroscopeSlice: StateCreator<
  MainHoroscopeStoreType & GeneralInfoStoreType & DailyHoroscopeStoreType & CompatibilityHoroscopeStoreType,
  [],
  [],
  CompatibilityHoroscopeStoreType
> = (set) => ({
  compatibilityInfo: null,
  error: null,
  status: null,

  sendCompatibilityRequest: async (requestFunction: () => Promise<ZodiacCompatibility>) => {
    set({ status: HttpActionKind.PENDING, error: null, generalHoroscopeData: null });

    try {
      const responseData = await requestFunction();
      set({
        compatibilityInfo: Object.values(responseData),
        status: HttpActionKind.COMPLETED,
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      set({ error: errorMessage, status: HttpActionKind.COMPLETED });
    }
  },
});

export const useHoroscopeStore = create<MainHoroscopeStoreType & GeneralInfoStoreType & DailyHoroscopeStoreType & CompatibilityHoroscopeStoreType>()((...a) => ({
  ...createGeneralHoroscopeSlice(...a),
  ...createMainHoroscopeSlice(...a),
  ...createDailyHoroscopeSlice(...a),
  ...createCompatibilityHoroscopeSlice(...a),
}));
