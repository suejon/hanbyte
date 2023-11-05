import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const SidebarMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuWidth = new Animated.Value(0);

  const toggleMenu = () => {
    Animated.timing(menuWidth, {
      toValue: menuVisible ? 0 : 200, // Set your desired menu width here
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <Text>Toggle Menu</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.menu, { width: menuWidth }]}>
        <TouchableOpacity onPress={() => console.log('Menu Item 1 clicked')}>
          <Text>Menu Item 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Menu Item 2 clicked')}>
          <Text>Menu Item 2</Text>
        </TouchableOpacity>
        {/* Add more menu items as needed */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  menu: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default SidebarMenu;
