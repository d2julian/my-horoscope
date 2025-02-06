import { View, StyleSheet, ImageBackground, ScrollView, Animated } from "react-native";
import { Text } from "react-native-paper";
import React, { useReducer, useRef } from "react";
import HeartAnimation from "@/components/HeartAnimation";
import { AppTheme, useAppTheme } from "@/UI/theme";
import images from "assets/images";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import CustomButton from "@/components/CustomButton";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@/UI/constants";
import PurpleContainer from "@/components/PurpleContainer";
import ZodiacItemCompatibility from "@/components/ZodiacItemCompatibility";
import { useShallow } from "zustand/react/shallow";
import { useFocusEffect } from "@react-navigation/native";

export default function Compatibility() {
  const [zodiacs, compatibilityInfo] = useHoroscopeStore(useShallow((state) => [state.zodiacs, state.compatibilityInfo]));

  type State = {
    heartIsVisible: boolean;
    firstZodiacIndexSelected?: number | undefined;
    secondZodiacIndexSelected?: number | undefined;
    showResults: boolean;
    info?: string;
  };

  type Action =
    | { type: "SET_HEART_VISIBLE"; payload: boolean }
    | { type: "SET_FIRST_ZODIAC_INDEX"; payload: number | undefined }
    | { type: "SET_SECOND_ZODIAC_INDEX"; payload: number | undefined }
    | { type: "SET_SHOW_RESULTS"; payload: boolean }
    | { type: "SET_INFO"; payload: string | undefined };

  const initialState: State = {
    heartIsVisible: false,
    firstZodiacIndexSelected: undefined,
    secondZodiacIndexSelected: undefined,
    showResults: false,
    info: undefined,
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_HEART_VISIBLE":
        return { ...state, heartIsVisible: action.payload };
      case "SET_FIRST_ZODIAC_INDEX":
        return { ...state, firstZodiacIndexSelected: action.payload };
      case "SET_SECOND_ZODIAC_INDEX":
        return { ...state, secondZodiacIndexSelected: action.payload };
      case "SET_SHOW_RESULTS":
        return { ...state, showResults: action.payload };
      case "SET_INFO":
        return { ...state, info: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch({ type: "SET_FIRST_ZODIAC_INDEX", payload: undefined });
        dispatch({ type: "SET_SECOND_ZODIAC_INDEX", payload: undefined });
        dispatch({ type: "SET_SHOW_RESULTS", payload: false });
      };
    }, [])
  );

  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onPressHandler = () => {
    dispatch({ type: "SET_HEART_VISIBLE", payload: true });
    dispatch({ type: "SET_SHOW_RESULTS", payload: true });
    fadeIn();
    const findCompatibility = compatibilityInfo?.find((info) => info.index_from === state.firstZodiacIndexSelected && info.index_to === state.secondZodiacIndexSelected);
    dispatch({ type: "SET_INFO", payload: findCompatibility?.compatibility_info });
  };
  const onFinishAnimation = () => {
    dispatch({ type: "SET_HEART_VISIBLE", payload: false });
  };

  const onPressFirstItemZodiac = (index: number) => {
    if (index === state.firstZodiacIndexSelected) {
      dispatch({ type: "SET_FIRST_ZODIAC_INDEX", payload: undefined });
      fadeOut();
    } else {
      dispatch({ type: "SET_FIRST_ZODIAC_INDEX", payload: index });
    }
  };

  const onPressSecondItemZodiac = (index: number) => {
    if (index === state.secondZodiacIndexSelected) {
      dispatch({ type: "SET_SECOND_ZODIAC_INDEX", payload: undefined });
      fadeOut();
    } else {
      dispatch({ type: "SET_SECOND_ZODIAC_INDEX", payload: index });
    }
  };

  return (
    <>
      <ImageBackground source={images.constelacion_general} style={styles.secondaryBackground} resizeMode="cover" />
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Compatibilidad de Amor
        </Text>
        <View style={{ padding: theme.spacing.medium, gap: theme.gap.small }}>
          <Text
            variant="titleSmall"
            style={{
              color: theme.colors.onPrimary,
              fontFamily: theme.defaultFont,
              textAlign: "center",
            }}
          >
            Elige un zodiaco
          </Text>
          <ScrollView horizontal={true} indicatorStyle={"white"}>
            {zodiacs.map((z) => {
              return (
                <ZodiacItemCompatibility
                  key={z.index}
                  index={z.index}
                  isSelected={state.firstZodiacIndexSelected === z.index}
                  image={z.image}
                  name={z.name}
                  onPress={onPressFirstItemZodiac}
                />
              );
            })}
          </ScrollView>
          <Text
            variant="titleSmall"
            style={{
              color: theme.colors.onPrimary,
              fontFamily: theme.defaultFont,
              textAlign: "center",
            }}
          >
            Elige otro zodiaco
          </Text>
          <ScrollView horizontal={true}>
            {zodiacs.map((z) => {
              return (
                <ZodiacItemCompatibility
                  key={z.index}
                  index={z.index}
                  isSelected={state.secondZodiacIndexSelected === z.index}
                  image={z.image}
                  name={z.name}
                  onPress={onPressSecondItemZodiac}
                />
              );
            })}
          </ScrollView>
        </View>
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>{state.showResults && <PurpleContainer title="Resultado final" iconName="heart" body={state.info} />}</Animated.View>
        <View style={{ marginBottom: 10, width: theme.size.largeXL, alignSelf: "center" }}>
          <CustomButton callback={onPressHandler} enabled={state.firstZodiacIndexSelected !== undefined && state.secondZodiacIndexSelected !== undefined} icon="heart">
            Consultar
          </CustomButton>
        </View>
      </View>
      <HeartAnimation visible={state.heartIsVisible} onFinishAnimation={onFinishAnimation} />
    </>
  );
}

const makeStyles = ({ gap, spacing, colors, defaultFont }: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: spacing.medium,
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
      elevation: 2,
      zIndex: 2,
      flex: 1,
    },
    secondaryBackground: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.3,
    },
    title: {
      color: colors.onPrimary,
      fontFamily: defaultFont,
      textAlign: "center",
      marginTop: spacing.medium,
    },
  });
