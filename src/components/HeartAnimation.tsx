import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@/UI/constants";
import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Animated, StyleProp, ViewStyle } from "react-native";
import { Icon } from "react-native-paper";

const ANIMATION_END_Y = Math.ceil(WINDOW_HEIGHT);
const NEGATIVE_END_Y = ANIMATION_END_Y * -1;

function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const Heart = () => {
  return <Icon source="heart" color="red" size={30} />;
};

type AnimatedHeartProps = {
  visible: boolean;
  style?: StyleProp<ViewStyle>;
};

const AnimatedHeart = ({ visible, style }: AnimatedHeartProps) => {
  const position = useRef(new Animated.Value(0)).current;

  const yAnimation = position.interpolate({
    inputRange: [NEGATIVE_END_Y, 0],
    outputRange: [ANIMATION_END_Y, 0],
  });

  const opacityAnimation = yAnimation.interpolate({
    inputRange: [0, ANIMATION_END_Y],
    outputRange: [1, 0],
  });

  const scaleAnimation = yAnimation.interpolate({
    inputRange: [0, 15, 30],
    outputRange: [0, 1.5, 1],
    extrapolate: "clamp",
  });

  const xAnimation = yAnimation.interpolate({
    inputRange: [0, ANIMATION_END_Y / 2, ANIMATION_END_Y],
    outputRange: [0, 25, 0],
  });

  const rotateAnimation = yAnimation.interpolate({
    inputRange: [0, ANIMATION_END_Y / 4, ANIMATION_END_Y / 3, ANIMATION_END_Y / 2, ANIMATION_END_Y],
    outputRange: ["0deg", "-2deg", "0deg", "2deg", "0deg"],
  });

  const getHeartAnimationStyle = (): StyleProp<ViewStyle> => {
    return {
      transform: [{ translateY: position }, { translateX: xAnimation }, { scale: scaleAnimation }, { rotate: rotateAnimation }],
      opacity: opacityAnimation,
    };
  };

  const startAnimation = () => {
    Animated.timing(position, {
      duration: 2000,
      toValue: NEGATIVE_END_Y,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (visible) {
      startAnimation();
    } else {
      position.setValue(0);
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.heartWrap, getHeartAnimationStyle(), style]}>
      <Heart />
    </Animated.View>
  );
};

type HeartState = {
  id: number;
  right?: number;
  bottom: number;
};

type CompatibilityProps = {
  visible: boolean;
  onFinishAnimation: Function;
};

const HeartAnimation = ({ visible, onFinishAnimation }: CompatibilityProps) => {
  const [hearts, setHearts] = useState<HeartState[]>([]);

  const addHearts = () => {
    const numberOfHearts = 20;
    const newHearts: HeartState[] = Array.from({ length: numberOfHearts }, () => ({
      id: Math.random(),
      right: getRandomNumber(WINDOW_WIDTH / 2 + 75, WINDOW_WIDTH / 2 - 75),
      bottom: getRandomNumber(1, WINDOW_HEIGHT * 0.3),
    }));
    setHearts(newHearts);
  };

  useEffect(() => {
    if (visible) {
      addHearts();
      onFinishAnimation();
    }
  }, [visible]);

  return (
    <View style={styles.container}>
      <View>
        {hearts.map((heart) => (
          <AnimatedHeart key={heart.id} visible={true} style={{ right: heart.right, bottom: heart.bottom }} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    position: "absolute",
    elevation: 1,
    zIndex: 1,
  },
  heartWrap: {
    position: "absolute",
    backgroundColor: "transparent",
  },
});

export default HeartAnimation;
