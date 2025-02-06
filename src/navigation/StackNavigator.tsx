import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NameInserting from "@/screens/NameInserting";
import ZodiacCarousel from "@/screens/ZodiacCarousel";
import ZodiacTabs from "./TabNavigator";
import Zodiac from "@/navigation/ZodiacNavigator";
import ErrorModal from "@/screens/ErrorModal";

const Stack = createNativeStackNavigator();

type StackNavigatorProps = {
  initialRouteName: string;
};

function StackNavigator({ initialRouteName }: StackNavigatorProps) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name="NameInserting"
        component={NameInserting}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name="ZodiacCarousel"
        component={ZodiacCarousel}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name="ZodiacTabs"
        component={ZodiacTabs}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "flip",
        }}
        name="Zodiac"
        component={Zodiac}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "flip",
        }}
        name="ErrorModal"
        component={ErrorModal}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
