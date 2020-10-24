import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WeekView from 'react-native-week-view';
import {
  Button,
  CheckBox,
  Divider,
  Layout,
  List,
  ListItem,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import { add, parseJSON, parseISO, format } from 'date-fns';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from 'react-native-reanimated';
import { AuthContext } from '../navigations';
import { LoadingIndicator } from '../components/LoadingIndicator';

let TIME_IN_WEEK = {};

const OptionsUnavailableTimeScreen = ({ route, navigation }) => {
  const { state } = React.useContext(AuthContext);

  const [mondayMorning, setMondayMorning] = useState(false);
  const [mondayAfternoon, setMondayAfternoon] = useState(false);
  const [tuesdayMorning, setTuesdayMorning] = useState(false);
  const [tuesdayAfternoon, setTuesdayAfternoon] = useState(false);
  const [wednesdayMorning, setWednesdayMorning] = useState(false);
  const [wednesdayAfternoon, setWednesdayAfternoon] = useState(false);
  const [thursdayMorning, setThursdayMorning] = useState(false);
  const [thursdayAfternoon, setThursdayAfternoon] = useState(false);
  const [fridayMorning, setFridayMorning] = useState(false);
  const [fridayAfternoon, setFridayAfternoon] = useState(false);

  React.useEffect(() => {
    const getUnvailTime = async () => {
      try {
        // console.log('in getUvailTime');
        const response = await axios.get(
          `/hosts/${state.userId}/unavailableTime`,
        );
        // console.log(response.data);
        if (response.status === 200) {
          TIME_IN_WEEK = response.data;
        }

        // brute force solution FOR NOW
        setMondayMorning(TIME_IN_WEEK.Monday.Morning);
        setMondayAfternoon(TIME_IN_WEEK.Monday.Afternoon);
        setTuesdayMorning(TIME_IN_WEEK.Tuesday.Morning);
        setTuesdayAfternoon(TIME_IN_WEEK.Tuesday.Afternoon);
        setWednesdayMorning(TIME_IN_WEEK.Wednesday.Morning);
        setWednesdayAfternoon(TIME_IN_WEEK.Wednesday.Afternoon);
        setThursdayMorning(TIME_IN_WEEK.Thursday.Morning);
        setThursdayAfternoon(TIME_IN_WEEK.Thursday.Afternoon);
        setFridayMorning(TIME_IN_WEEK.Friday.Morning);
        setFridayAfternoon(TIME_IN_WEEK.Friday.Afternoon);
      } catch (e) {
        // console.log('in get unavail time', e);
      }
    };

    getUnvailTime();
  }, [state]);

  const saveUnvailTime = async () => {
    try {
      TIME_IN_WEEK.Monday.Morning = mondayMorning;
      TIME_IN_WEEK.Monday.Afternoon = mondayAfternoon;
      TIME_IN_WEEK.Tuesday.Morning = tuesdayMorning;
      TIME_IN_WEEK.Tuesday.Afternoon = tuesdayAfternoon;
      TIME_IN_WEEK.Wednesday.Morning = wednesdayMorning;
      TIME_IN_WEEK.Wednesday.Afternoon = wednesdayAfternoon;
      TIME_IN_WEEK.Thursday.Morning = thursdayMorning;
      TIME_IN_WEEK.Thursday.Afternoon = thursdayAfternoon;
      TIME_IN_WEEK.Friday.Morning = fridayMorning;
      TIME_IN_WEEK.Friday.Afternoon = fridayAfternoon;

      const response = await axios.post(
        `/hosts/${state.userId}/unavailableTime`,
        TIME_IN_WEEK,
      );
      if (response.status === 201) {
        Toast.show('save', Toast.SHORT, ['UIAlertController']);
      }
      // console.log(response.data);
    } catch (e) {
      // console.log('in saveUnvailTime', e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Home" alignment="center" />
      <Divider />
      <Layout style={styling.container}>
        <View style={{ alignItems: 'center' }}>
          <Text category={'h6'}>CHOOSE YOUR UNAVAILABLE TIME</Text>
        </View>
        <CheckBox
          checked={mondayMorning}
          onChange={(nextChecked) => setMondayMorning(nextChecked)}>
          MONDAY MORNING
        </CheckBox>
        <CheckBox
          checked={mondayAfternoon}
          onChange={(nextChecked) => setMondayAfternoon(nextChecked)}>
          MONDAY AFTERNOON
        </CheckBox>
        <CheckBox
          checked={tuesdayMorning}
          onChange={(nextChecked) => setTuesdayMorning(nextChecked)}>
          TUESDAY MORNING
        </CheckBox>
        <CheckBox
          checked={tuesdayAfternoon}
          onChange={(nextChecked) => setTuesdayAfternoon(nextChecked)}>
          TUESDAY AFTERNOON
        </CheckBox>
        <CheckBox
          checked={wednesdayMorning}
          onChange={(nextChecked) => setWednesdayMorning(nextChecked)}>
          WEDNESDAY MORNING
        </CheckBox>
        <CheckBox
          checked={wednesdayAfternoon}
          onChange={(nextChecked) => setWednesdayAfternoon(nextChecked)}>
          WEDNESDAY AFTERNOON
        </CheckBox>
        <CheckBox
          checked={thursdayMorning}
          onChange={(nextChecked) => setThursdayMorning(nextChecked)}>
          THURSDAY MORNING
        </CheckBox>
        <CheckBox
          checked={thursdayAfternoon}
          onChange={(nextChecked) => setThursdayAfternoon(nextChecked)}>
          THURSDAY AFTERNOON
        </CheckBox>
        <CheckBox
          checked={fridayMorning}
          onChange={(nextChecked) => setFridayMorning(nextChecked)}>
          FRIDAY MORNING
        </CheckBox>
        <CheckBox
          checked={fridayAfternoon}
          onChange={(nextChecked) => setFridayAfternoon(nextChecked)}>
          FRIDAY AFTERNOON
        </CheckBox>
        <Button onPress={() => saveUnvailTime()}>SAVE</Button>
      </Layout>
    </SafeAreaView>
  );
};

const styling = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

export default OptionsUnavailableTimeScreen;
