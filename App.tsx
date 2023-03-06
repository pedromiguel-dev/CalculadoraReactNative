/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import {ThemeContext} from './src/context/ThemeContext';
import {myColors} from './src/styles/colors';
import Button from './src/components/Button';
import MyKeyboard from './src/components/MyKeyboard';

function themeSwitch(theme: string): {} {
  return theme === 'light'
    ? styles.container
    : [styles.container, {backgroundColor: '#000'}];
}

function App(): JSX.Element {
  const [theme, setTheme] = useState<string>('light');
  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView style={[themeSwitch(theme)]}>
        <Switch
          style={styles.switch}
          value={theme === 'light'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <MyKeyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: myColors.light,
  },
  switch: {
    position: 'absolute',
    top: 20,
  },
});

export default App;
