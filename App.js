import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';
import Router from './src/navigation/Router';
import SQLite from 'react-native-sqlite-storage';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  global.db = SQLite.openDatabase(
    {
      name: 'musclor.db',
      location: 'default',
      createFromLocation: '~musclor.db',
    },
    () => { },
    error => {
      console.log("ERROR: " + error);
    }
  );
  return (
    <Router/>
  );
};

const styles = StyleSheet.create({
});

export default App;
