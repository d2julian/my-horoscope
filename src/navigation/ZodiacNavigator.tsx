import React, { useState } from "react";
import { Text } from "react-native";
import { TabRoutes } from "@/types/types";
import { TabView, SceneMap, TabBar, TabBarProps } from "react-native-tab-view";
import { WINDOW_WIDTH } from "@/UI/constants";
import { useAppTheme } from "@/UI/theme";
import Today from "@/screens/Today";
import General from "@/screens/General";

export default function ZodiacNavigator() {
  const theme = useAppTheme();

  const renderScene = SceneMap({
    TodayRoute: Today,
    GeneralRoute: General,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "TodayRoute", title: "Hoy" },
    { key: "GeneralRoute", title: "General" },
  ]);

  const renderTabBar = (props: TabBarProps<TabRoutes>) => (
    <TabBar
      {...props}
      tabStyle={{ borderRightWidth: 1, borderColor: theme.colors.mediumPrimary }}
      indicatorStyle={{ backgroundColor: theme.colors.primaryContainer }}
      renderLabel={({ route, focused }) => <Text style={{ fontFamily: theme.defaultFont, color: focused ? theme.colors.onPrimary : theme.colors.lightGray }}>{route.title}</Text>}
      style={{ backgroundColor: "transparent", padding: 10, borderWidth: 1, borderColor: "transparent" }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: WINDOW_WIDTH }}
      renderTabBar={renderTabBar}
      swipeEnabled={false}
    />
  );
}
