// App.tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts, Cinzel_400Regular, Cinzel_700Bold, Cinzel_600SemiBold } from "@expo-google-fonts/cinzel";
import StackNavigator from "@/navigation/StackNavigator";
import { useShallow } from "zustand/react/shallow";
import { theme } from "@/UI/theme";
import images from "assets/images";
import { getAllCompatibilityHoroscopes, getAllDailyHoroscopes, getAllMainHoroscopes } from "@/lib/api";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import { HttpActionKind } from "@/types/types";
import { getData } from "@/store/phoneStorage";
import { STORED_USER_NAME, STORED_ZODIAC_KEY } from "@/UI/constants";

export default function App() {
  const [fontsLoaded] = useFonts({ Cinzel_400Regular, Cinzel_700Bold, Cinzel_600SemiBold });

  const [sendMainRequest, sendDailyRequest, sendCompatibilityRequest, setUserName, setMainZodiac, userName, mainZodiac, error, status, dailyHoroscopeData] = useHoroscopeStore(
    useShallow((state) => [
      state.sendMainRequest,
      state.sendDailyRequest,
      state.sendCompatibilityRequest,
      state.setUserName,
      state.setMainZodiac,
      state.userName,
      state.mainZodiac,
      state.error,
      state.status,
      state.dailyHoroscopeData,
    ])
  );

  const [isLoadingStorageData, setIsLoadingStorageData] = useState(false);

  useEffect(() => {
    sendMainRequest(getAllMainHoroscopes);
    sendDailyRequest(getAllDailyHoroscopes);
    sendCompatibilityRequest(getAllCompatibilityHoroscopes);
  }, [sendMainRequest, sendDailyRequest]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingStorageData(true);
      const userName = await getData(STORED_USER_NAME);
      const zodiac = await getData(STORED_ZODIAC_KEY);
      if (userName !== null && zodiac != null) {
        setUserName(userName);
        setMainZodiac(zodiac);
      }
      setIsLoadingStorageData(false);
    };

    fetchData();
  }, []);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <ImageBackground source={images.universe} style={{ flex: 1 }} resizeMode="cover">
        {status === HttpActionKind.PENDING || !fontsLoaded || isLoadingStorageData ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color={theme.colors.primaryContainer} />
          </View>
        ) : (
          <NavigationContainer theme={navTheme}>
            <SafeAreaView style={styles.container}>
              <StackNavigator
                initialRouteName={
                  HttpActionKind.COMPLETED && (error || dailyHoroscopeData?.length === 0) ? "ErrorModal" : userName !== null && mainZodiac !== null ? "ZodiacTabs" : "NameInserting"
                }
              />
              <StatusBar style="light" backgroundColor={theme.colors.primary} />
            </SafeAreaView>
          </NavigationContainer>
        )}
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
