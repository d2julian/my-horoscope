import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { AppTheme, useAppTheme } from "@/UI/theme";
import ZodiacItemList from "./ZodiacItemList";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function ZodiacList() {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const zodiacs = useHoroscopeStore((state) => state.zodiacs);
  const navigation = useAppNavigation();

  const onZodiacPress = (zodiac: string) => {
    navigation.navigate("Zodiac", { zodiacProp: zodiac });
  };

  return (
    <View>
      <Text variant="titleLarge" style={styles.title}>
        Zodiacos
      </Text>

      <View style={styles.listContainer}>
        {zodiacs.map((z) => {
          return (
            <View key={z.name}>
              <ZodiacItemList image={z.image} name={z.name} onPress={onZodiacPress} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const makeStyles = ({ spacing, colors, defaultFont }: AppTheme) =>
  StyleSheet.create({
    listContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: spacing.small,
    },
    title: {
      color: colors.onPrimary,
      fontFamily: defaultFont,
      textAlign: "center",
      marginTop: spacing.medium,
      marginBottom: spacing.medium,
    },
  });
