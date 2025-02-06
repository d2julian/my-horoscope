import React, { useRef } from "react";
import { Animated, Image, ImageSourcePropType, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { WINDOW_WIDTH } from "@/UI/constants";

type ZodiacItemListProps = {
  image: ImageSourcePropType;
  name: string;
  onPress: Function;
};

export default function ZodiacItemList({ image, name, onPress }: ZodiacItemListProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const onPressHandlerAnimation = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const onPressOutHandlerAnimation = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
    onPress(name);
  };

  return (
    <TouchableWithoutFeedback onPressIn={onPressHandlerAnimation} onPressOut={onPressOutHandlerAnimation}>
      <Animated.View style={[styles.itemContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{name}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: WINDOW_WIDTH / 4,
    margin: 5,
    paddingVertical: 15,
    opacity: 0.9,
  },
  image: {
    height: WINDOW_WIDTH / 5,
    width: WINDOW_WIDTH / 5,
  },
  text: {
    color: "white",
    fontSize: 12,
    fontFamily: "Cinzel_700Bold",
    textAlign: "center",
  },
});
