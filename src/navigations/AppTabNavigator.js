import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import Profile from '../screens/Profile';
import OptionsUnavailableTimeScreen from '../screens/OptionsUnavailableTimeScreen';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import { AuthContext } from './index';

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
const PersonIcon = (props) => <Icon {...props} name="person-outline" />;
const OptionIcon = (props) => <Icon {...props} name={'options-2-outline'} />;

const BottomTabBar = ({ navigation, state, isHost }) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="HOME" icon={HomeIcon} />
      {isHost ? (
        <BottomNavigationTab title="OPTIONS" icon={OptionIcon} />
      ) : (
        <BottomNavigationTab title="SEARCH" icon={SearchIcon} />
      )}
      <BottomNavigationTab title="PROFILE" icon={PersonIcon} />
    </BottomNavigation>
  );
};

// TODO: press tab navigate to root of stack
const AppTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { state, authContext } = React.useContext(AuthContext);
  const isHost = state.userDetails._host;

  // console.log('at AppTabNavigator');
  // console.log(state.userToken);
  // console.log(state.userDetails._host);
  return (
    <Tab.Navigator
      tabBar={(props) => {
        props.isHost = isHost;
        return <BottomTabBar {...props} />;
      }}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      initialRouteName="Home"
      backBehaviour="initialRoute">
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      {isHost ? (
        <Tab.Screen
          name="OptionsUnavailableTime"
          component={OptionsUnavailableTimeScreen}
        />
      ) : (
        <Tab.Screen name="Search" component={SearchStackNavigator} />
      )}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
