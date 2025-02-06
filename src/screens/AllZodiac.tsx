import { ImageBackground, StyleSheet, View } from "react-native";
import React from "react";
import ZodiacList from "@/components/ZodiacList";
import images from "assets/images";

const AllZodiac = () => {
  return (
    <>
      <ImageBackground source={images.constelacion} style={styles.secondaryBackground} resizeMode="cover" />
      <View style={styles.container}>
        <ZodiacList />
      </View>
    </>
  );
};

export default AllZodiac;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  secondaryBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
});
