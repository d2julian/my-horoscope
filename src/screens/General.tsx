import { View, ImageBackground, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useDailyHoroscope } from "@/selectors/dailyZodiacSelector";
import { HoroscopeData, ZodiacData } from "@/types/types";
import { AppTheme, useAppTheme } from "@/UI/theme";
import { useMainHoroscope } from "@/selectors/mainZodiacSelector";
import images from "assets/images";
import PurpleContainer from "@/components/PurpleContainer";
import ZodiacHeader from "@/components/ZodiacHeader";

type RootStackParamList = {
  Zodiac: { zodiacProp: string };
};

type ZodiacRouteProp = RouteProp<RootStackParamList, "Zodiac">;

export default function Today() {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const route = useRoute<ZodiacRouteProp>();
  const { zodiacProp } = route.params;

  const dailyData: HoroscopeData | null = useDailyHoroscope(zodiacProp);
  const zodiacDailyData = zodiacProp ? dailyData : null;

  const generalData: ZodiacData | null = useMainHoroscope(zodiacProp);
  const zodiacGeneralData = zodiacProp ? generalData : null;

  return (
    <>
      <ImageBackground source={images.constelacion_general} style={styles.secondaryBackground} resizeMode="cover" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: theme.spacing.small }}>
        <View style={styles.container}>
          <ZodiacHeader
            zodiac={zodiacProp}
            zoodiacName={zodiacDailyData?.zodiac}
            image={zodiacDailyData?.image}
            dateFrom={zodiacGeneralData?.date_from}
            dateTo={zodiacGeneralData?.date_to}
          />
          <PurpleContainer iconName="emoticon-happy-outline" title="Personalidad" body={zodiacGeneralData?.personality} />
          <PurpleContainer iconName="arm-flex-outline" title="Fortalezas" body={zodiacGeneralData?.strengths} />
          <PurpleContainer iconName="cancel" title="Debilidades" body={zodiacGeneralData?.weaknesses} />
        </View>
      </ScrollView>
    </>
  );
}

const makeStyles = ({ gap, spacing }: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: spacing.medium,
      gap: gap.medium,
    },
    secondaryBackground: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.3,
    },
  });
