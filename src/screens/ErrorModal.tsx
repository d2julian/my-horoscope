import { useAppTheme } from "@/UI/theme";
import React from "react";
import { Modal } from "react-native-paper";
import { Text } from "react-native-paper";

const ErrorModal = () => {
  const theme = useAppTheme();
  return (
    <Modal visible={true} contentContainerStyle={{ backgroundColor: theme.colors.lightGray, padding: theme.spacing.medium }}>
      <Text
        variant="titleMedium"
        style={{
          color: theme.colors.error,
          fontFamily: theme.defaultFont,
          textAlign: "center",
        }}
      >
        Error recuperando datos
      </Text>
    </Modal>
  );
};

export default ErrorModal;
