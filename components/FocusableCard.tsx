import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

export const FocusableCard = ({ children, onPress }: { children: React.ReactNode, onPress?: () => void }) => {
  const [focused, setFocused] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[styles.card, focused && styles.focusedCard]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 5,
  },
  focusedCard: {
    borderWidth: 3,
    borderColor: '#ff6f61',
  },
});
