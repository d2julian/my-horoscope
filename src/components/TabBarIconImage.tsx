import { Image, ImageSourcePropType } from "react-native";
import React from "react";

type TabBarIconImageProps = {
  image: ImageSourcePropType;
  focused: boolean;
  size: number;
};

export default function TabBarIconImage({ image, focused, size }: TabBarIconImageProps) {
  return (
    <Image
      source={image}
      style={[
        {
          width: size,
          height: size,
          opacity: focused ? 1 : 0.4,
        },
      ]}
    />
  );
}
