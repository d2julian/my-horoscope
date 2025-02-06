import React from "react";
import { View, Text, Pressable, ImageSourcePropType, StyleSheet, Image } from "react-native";
import { AppTheme, useAppTheme } from "@/UI/theme";
import { WINDOW_WIDTH } from "@/UI/constants";

type ZodiacItemCompatibilityProps = {
  index: number;
  name: string;
  image: ImageSourcePropType;
  isSelected: boolean;
  onPress: Function;
};

const ZodiacItemCompatibility = ({ index, name, image, isSelected, onPress }: ZodiacItemCompatibilityProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const onPressHandler = () => {
    onPress(index);
  };
  return (
    <Pressable style={[styles.itemContainer, styles.pressable, isSelected ? styles.stylePressableSelected : null]} onPress={onPressHandler}>
      <View>
        <Image source={image} style={styles.image} />
        <Text style={styles.zodiacText}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default ZodiacItemCompatibility;

const makeStyles = ({ iconSize, fontSize }: AppTheme) =>
  StyleSheet.create({
    itemContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
      opacity: 0.9,
      width: WINDOW_WIDTH / 4,
    },
    image: {
      height: iconSize.large,
      width: iconSize.large,
    },
    zodiacText: {
      color: "white",
      fontSize: fontSize.medium,
      fontFamily: "Cinzel_700Bold",
      textAlign: "center",
      textShadowColor: "white",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 50,
      textTransform: "uppercase",
    },
    pressable: {
      opacity: 0.5,
    },
    stylePressableSelected: {
      opacity: 1,
    },
  });
