import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import AppointmentDetailsScreen from '../screens/AppointmentDetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStackNavigator = ({ route, nagivation }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{ title: 'Calendar' }}
      />
      <Stack.Screen
        name={'Detail'}
        component={AppointmentDetailsScreen}
        options={{ title: 'Appointment Detail' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
