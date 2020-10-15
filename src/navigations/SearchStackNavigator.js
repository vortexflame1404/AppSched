import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import ProfSchedScreen from '../screens/ProfSchedScreen';

const SearchStackNavigator = (props) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen
        name={'Search'}
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <Stack.Screen
        name={'ProfSched'}
        component={ProfSchedScreen}
        options={{ title: 'Schedule' }}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
