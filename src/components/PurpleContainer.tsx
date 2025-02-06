import { View, StyleSheet } from "react-native";
import React from "react";
import { AppTheme, useAppTheme } from "@/UI/theme";
import { Text, Icon } from "react-native-paper";

type PurpleContainerProps = {
  iconName: string;
  title: string;
  body?: string;
};

const PurpleContainer = ({ iconName, title, body }: PurpleContainerProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContainerContent}>
        <Icon source={iconName} color={theme.colors.onPrimary} size={20} />
        <Text variant="bodyLarge" style={styles.cardContainerText}>
          {title}
        </Text>
      </View>
      <Text variant="bodySmall" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultMediumFont, textAlign: "justify" }}>
        {body}
      </Text>
    </View>
  );
};

export default PurpleContainer;

const makeStyles = ({ colors, defaultFont, gap, spacing }: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: spacing.medium,
      gap: gap.medium,
    },
    cardContainer: {
      backgroundColor: `rgba(${colors.rgbaPrimary}, 0.6)`,
      borderRadius: 10,
      marginHorizontal: spacing.small,
      padding: spacing.smallXL,
      gap: gap.small,
    },
    cardContainerContent: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: gap.small,
    },
    cardContainerText: {
      color: colors.onPrimary,
      fontFamily: defaultFont,
      textAlign: "justify",
    },
    progressContainer: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      backgroundColor: `rgba(${colors.rgbaPrimary}, 0.6)`,
      borderRadius: 10,
      marginHorizontal: 10,
    },
    secondaryBackground: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.3,
    },
  });
