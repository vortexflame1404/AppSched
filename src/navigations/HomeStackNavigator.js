import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import AppointmentDetailsScreen from '../screens/AppointmentDetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ProfSchedScreen from '../screens/ProfSchedScreen';

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
      <Stack.Screen
        name={'ProfSched'}
        component={ProfSchedScreen}
        options={{ title: 'Schedule' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
