import React, { useState } from "react";
import { STORED_USER_NAME, WINDOW_HEIGHT, WINDOW_WIDTH } from "@/UI/constants";
import { useAppTheme } from "@/UI/theme";
import { View, Image } from "react-native";
import { TextInput, Text, HelperText } from "react-native-paper";
import CustomButton from "@/components/CustomButton";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import images from "assets/images";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import { storeData } from "@/store/phoneStorage";

function NameInserting() {
  const theme = useAppTheme();
  const navigation = useAppNavigation();
  const setUserName = useHoroscopeStore((status) => status.setUserName);

  const [nameInput, setNameInput] = useState<string>("");
  const [errorInput, setErrorInput] = useState<string>("");

  const onChangeTextHandler = (value: string) => {
    if (value?.length > 10) {
      setErrorInput("El nombre no puede tener más de 10 caracteres");
    } else {
      setErrorInput("");
      setNameInput(value);
    }
  };

  const inputHasErrors = () => {
    return errorInput.length > 0;
  };

  const buttonIsEnabled = () => {
    return !inputHasErrors() && nameInput.length > 0;
  };

  const onPressHandler = () => {
    if (nameInput === "" || nameInput === undefined) {
      setErrorInput("Debes introducir un nombre antes de continuar");
    } else {
      storeData(STORED_USER_NAME, nameInput);
      setUserName(nameInput);
      navigation.navigate("ZodiacCarousel");
    }
  };

  return (
    <View
      style={{
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: theme.size.largeXXL,
        }}
      >
        <Text
          variant="titleLarge"
          style={{
            color: theme.colors.onPrimary,
            fontFamily: theme.defaultFont,
            textAlign: "center",
          }}
        >
          BIENVENIDO A TU HOROSCOPE APP
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Image
          source={images.carta_de_tarot}
          style={[
            {
              width: theme.iconSize.largeXL,
              height: theme.iconSize.largeXL,
            },
          ]}
        />
      </View>
      <View style={{ flex: 2, justifyContent: "flex-start", alignItems: "center", gap: theme.gap.medium }}>
        <Text variant="titleMedium" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultFont }}>
          Por favor, escribe tu nombre
        </Text>
        <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
          <TextInput
            label={
              <Text
                variant="titleMedium"
                style={{
                  color: theme.colors.mediumPrimary,
                  fontFamily: theme.defaultFont,
                  textAlign: "center",
                }}
              >
                Tu nombre
              </Text>
            }
            value={nameInput}
            onChangeText={onChangeTextHandler}
            style={{ width: theme.size.largeXXL }}
            contentStyle={{ fontFamily: theme.defaultMediumFont, color: theme.colors.primary }}
            left={
              <TextInput.Icon
                icon={({ size }) => (
                  <Image
                    source={images.bola_de_cristal}
                    style={[
                      {
                        width: size,
                        height: size,
                      },
                    ]}
                  />
                )}
              />
            }
          />
          <HelperText type="error" style={{ fontWeight: "bold" }} visible={inputHasErrors()}>
            {errorInput}
          </HelperText>
        </View>
      </View>
      <View style={{ padding: 20, width: theme.size.largeXL }}>
        <CustomButton callback={onPressHandler} enabled={buttonIsEnabled()} icon="arrow-right-bold-circle">
          Next
        </CustomButton>
      </View>
    </View>
  );
}

export default NameInserting;
