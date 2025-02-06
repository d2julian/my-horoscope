import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { HelperText } from "react-native-paper";
import { useAppTheme } from "@/UI/theme";
import { parallaxLayout } from "@/UI/parallax";
import { WINDOW_WIDTH, WINDOW_HEIGHT, STORED_ZODIAC_KEY } from "@/UI/constants";
import CustomButton from "@/components/CustomButton";
import ZodiacItem from "@/components/ZodiacItem";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import { storeData } from "@/store/phoneStorage";

export default function ZodiacCarousel() {
  const setMainZodiac = useHoroscopeStore((state) => state.setMainZodiac);
  const zodiacs = useHoroscopeStore((state) => state.zodiacs);

  const [zodiacIndexSelected, setzodiacIndexSelected] = useState<number>();
  const [errorInput, setErrorInput] = useState<string>("");
  const theme = useAppTheme();
  const navigation = useAppNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const onPressButtonHandler = () => {
    if (zodiacIndexSelected === null || zodiacIndexSelected === undefined) {
      setErrorInput("Debes seleccionar un zodiaco para continuar");
    } else {
      storeData(STORED_ZODIAC_KEY, zodiacs[zodiacIndexSelected].name);
      setMainZodiac(zodiacs[zodiacIndexSelected].name);
      navigation.reset({
        index: 0,
        routes: [{ name: "ZodiacTabs" }],
      });
    }
  };

  const inputHasErrors = () => {
    return errorInput.length > 0;
  };

  const buttonIsEnabled = () => {
    return !inputHasErrors() && !zodiacIndexSelected !== null && zodiacIndexSelected !== undefined;
  };

  const PAGE_WIDTH = WINDOW_WIDTH;
  const PAGE_HEIGHT = WINDOW_HEIGHT - 100;
  const ITEM_WIDTH = PAGE_WIDTH * 0.7;

  const onPressHandler = (index: number) => {
    setErrorInput("");
    if (index === zodiacIndexSelected) {
      setzodiacIndexSelected(undefined);
    } else {
      setzodiacIndexSelected(index);
    }
  };

  return (
    <Animated.View style={{ flex: 1, justifyContent: "center", alignItems: "center", opacity: fadeAnim }}>
      <Carousel
        vertical
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          alignItems: "center",
          marginTop: 20,
        }}
        width={ITEM_WIDTH}
        height={ITEM_WIDTH}
        customAnimation={parallaxLayout({
          size: ITEM_WIDTH,
        })}
        data={zodiacs}
        renderItem={({ index, item }) => (
          <ZodiacItem index={index} image={item.image} name={item.name} isSelected={zodiacIndexSelected === index} onPressHandler={onPressHandler} />
        )}
      />
      <HelperText type="error" style={{ fontWeight: "bold" }} visible={inputHasErrors()}>
        {errorInput}
      </HelperText>
      <View style={{ padding: 20, width: theme.size.largeXL }}>
        <CustomButton callback={onPressButtonHandler} enabled={buttonIsEnabled()} icon="arrow-right-bold-circle">
          Next
        </CustomButton>
      </View>
    </Animated.View>
  );
}
