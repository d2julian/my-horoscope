import { View, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { useAppTheme } from "@/UI/theme";
import { ZODIAC_ICONS } from "@/UI/constants";
import { Text, Icon } from "react-native-paper";

type ZodiacHeaderType = {
  zodiac?: string;
  zoodiacName?: string;
  image?: ImageSourcePropType;
  dateFrom?: string;
  dateTo?: string;
};

const ZodiacHeader = ({ zodiac, zoodiacName, image, dateFrom, dateTo }: ZodiacHeaderType) => {
  const theme = useAppTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: theme.gap.large }}>
      <Icon source={ZODIAC_ICONS[zodiac]} color={theme.colors.onPrimary} size={theme.iconSize.large} />
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: theme.gap.small }}>
          <Text variant="titleLarge" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultFont, textAlign: "center" }}>
            {zoodiacName}
          </Text>
          <Image source={image} style={{ height: theme.iconSize.smaller, width: theme.iconSize.smaller }} />
        </View>
        <Text variant="bodySmall" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultFont, textAlign: "center" }}>
          {dateFrom} - {dateTo}
        </Text>
      </View>
    </View>
  );
};

export default ZodiacHeader;
