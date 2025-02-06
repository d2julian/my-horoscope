import { View, Image, ImageSourcePropType } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { useAppTheme } from "@/UI/theme";

type ZodiacCompatibleProps = {
  element?: string;
  image?: ImageSourcePropType;
  name?: string;
};

const ZodiacCompatible = ({ element, image, name }: ZodiacCompatibleProps) => {
  const theme = useAppTheme();
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image source={image} style={{ height: theme.iconSize.medium, width: theme.iconSize.medium }} />
      <Text variant="bodySmall" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultFont }}>
        {name}
      </Text>
      <Text variant="bodySmall" style={{ color: theme.colors.lightPrimary, fontFamily: theme.defaultFont }}>
        ({element})
      </Text>
    </View>
  );
};

export default ZodiacCompatible;
