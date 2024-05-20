import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {typography} from '../../styles/typography';

export default function CText({
  children,
  type = 'p',
  fontWeight = 'normal',
  color = '#000000',
  style,
  onPress,
  marginVertical,
  marginHorizontal,
}) {
  return (
    <Text
      onPress={onPress}
      style={[
        {
          fontWeight: fontWeight,
          color: color,
          marginVertical: marginVertical,
          marginHorizontal: marginHorizontal,
        },
        styles[type],
        style,
      ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    ...typography.h1,
  },
  h2: {
    ...typography.h2,
  },
  p: {
    ...typography.p,
  },
  li: {
    ...typography.li,
  },
});
