import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllZodiac from "@/screens/AllZodiac";
import Zodiac from "@/navigation/ZodiacNavigator";
import { AppTheme, useAppTheme } from "@/UI/theme";
import images from "assets/images";
import TabBarIconImage from "@/components/TabBarIconImage";
import Compatibility from "@/screens/Compatibility";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import { useShallow } from "zustand/react/shallow";

const Tab = createBottomTabNavigator();

export default function ZodiacTabs() {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const [mainZodiac] = useHoroscopeStore(useShallow((state) => [state.mainZodiac, state.userName]));
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.surfaceDisabled,
        tabBarStyle: {
          height: 56,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: theme.colors.lightPrimary,
          borderBottomColor: theme.colors.lightPrimary,
        },
      }}
    >
      <Tab.Screen
        name="Mi Horoscopo"
        component={Zodiac}
        options={{
          ...styles,
          tabBarIcon: ({ size, focused }) => <TabBarIconImage image={images.tarot} focused={focused} size={size} />,
        }}
        initialParams={{ zodiacProp: mainZodiac }}
      />
      <Tab.Screen
        name="Mas Horoscopos"
        component={AllZodiac}
        options={{
          ...styles,
          tabBarIcon: ({ size, focused }) => <TabBarIconImage image={images.zodiacs} focused={focused} size={size} />,
        }}
      />
      <Tab.Screen
        name="Compatibilidad"
        component={Compatibility}
        options={{
          ...styles,
          tabBarIcon: ({ size, focused }) => <TabBarIconImage image={images.compatibilidad} focused={focused} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
const makeStyles = ({ defaultFont, fontSize }: AppTheme) =>
  StyleSheet.create({
    tabBarLabelStyle: {
      fontFamily: defaultFont,
      fontSize: fontSize.small,
    },
  });
