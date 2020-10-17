import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import Profile from '../screens/Profile';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import { AuthContext } from './index';

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

const BottomTabBar = ({ navigation, state }) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="HOME" icon={HomeIcon} />
      <BottomNavigationTab title="SEARCH" icon={SearchIcon} />
      <BottomNavigationTab title="PROFILE" icon={PersonIcon} />
    </BottomNavigation>
  );
};

const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  return !['Detail', 'ProfSched'].includes(routeName);
};

// TODO: press tab navigate to root of stack
const AppTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { state, authContext } = React.useContext(AuthContext);

  console.log('at AppTabNavigator');
  console.log(state.userToken);
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      initialRouteName="Home"
      backBehaviour="initialRoute">
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Search" component={SearchStackNavigator} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
