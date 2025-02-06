import auth from "../../firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import { ZodiacCompatibility, ZodiacDailyResponse, ZodiacMainResponse } from "@/types/types";
const FIREBASE_DOMAIN = process.env.EXPO_PUBLIC_FIREBASE_URL;

export async function getAllMainHoroscopes(): Promise<ZodiacMainResponse> {
  const token = await getUser();
  const response = await fetch(`${FIREBASE_DOMAIN}/horoscope_main.json?auth=${token}`);
  const data: ZodiacMainResponse = await response.json();
  if (!response.ok) {
    throw new Error("Could not fetch horoscopes.");
  }

  return data;
}

export async function getAllCompatibilityHoroscopes(): Promise<ZodiacCompatibility> {
  const token = await getUser();
  const response = await fetch(`${FIREBASE_DOMAIN}/horoscope_love_compatibility.json?auth=${token}`);
  const data: ZodiacCompatibility = await response.json();
  if (!response.ok) {
    throw new Error("Could not fetch horoscopes.");
  }

  return data;
}

export async function getAllDailyHoroscopes(): Promise<ZodiacDailyResponse> {
  const token = await getUser();
  const response = await fetch(`${FIREBASE_DOMAIN}/horoscope_daily.json?&auth=${token}`);
  console.log("response", response);
  const data: ZodiacDailyResponse = await response.json();
  if (!response.ok) {
    throw new Error("Could not fetch horoscopes.");
  }

  return data;
}

const getUser = async () => {
  try {
    const user = await authenticateAnonymously();
    if (!user) {
      throw new Error("Error authenticate anonymously");
    }
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    throw new Error("Error getting user: " + error);
  }
};

const authenticateAnonymously = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error("Error in authenticate anonymously :", error);
  }
};
