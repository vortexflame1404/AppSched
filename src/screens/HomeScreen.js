import React from 'react';
import { StyleSheet } from 'react-native';
import WeekView from 'react-native-week-view';
import { Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { add } from 'date-fns';
import Toast from 'react-native-simple-toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from 'react-native-reanimated';

const generateDates = (hours, minutes) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  if (minutes != null) {
    date.setMinutes(minutes);
  }
  return date;
};

const sampleEvents = [
  {
    id: 1,
    description: 'Event 1',
    startDate: generateDates(0),
    endDate: generateDates(1),
    color: 'blue',
  },
  {
    id: 2,
    description: 'Event 2',
    startDate: generateDates(3),
    endDate: generateDates(4),
    color: 'red',
  },
  {
    id: 4,
    description: 'Event 3',
    startDate: generateDates(-4),
    endDate: generateDates(-3),
    color: 'green',
  },
];

const HomeScreen = ({ route, navigation }) => {
  const now = new Date();
  const hourAndMinute = now.getHours() + ':' + now.getMinutes();
  const date =
    now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();

  //example for week view
  const events = sampleEvents;
  const selectedDate = new Date();

  const onEventPress = ({ id, color, startDate, endDate, description }) => {
    navigation.navigate('Detail', {
      id: id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      description: description,
    });
  };

  const onGridClick = (event, startHour) => {
    console.log(`start hour: ${startHour}`);
    console.log(typeof startHour);
    if (startHour > 16 || startHour < 9) {
      Toast.show('Outside of working hour', Toast.SHORT, ['UIAlertController']);
      return;
    }
    console.log('here');
  };

  const onNextWeek = (event) => {
    console.log(event);
    console.log(add(new Date(), { days: 1 }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Home" alignment="center"/>
      <Divider/>
      <Layout style={styling.container}>
        <WeekView
          events={events}
          selectedDate={selectedDate}
          numberOfDays={5}
          hourTextStyle={{ color: '#000000' }}
          onEventPress={onEventPress}
          onGridClick={onGridClick}
          headerStyle={style.headerStyle}
          formatDateHeader="MMM D"
          hoursInDisplay={6}
          startHour={9}
          onSwipeNext={onNextWeek}
        />
      </Layout>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#3366FF',
    color: '#fff',
    borderColor: '#fff',
  },
  hourText: {
    color: 'white',
  },
});

const styling = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'baseline',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  // set width to fit text
  buttonOuterLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLayout: {
    marginBottom: 10,
  },
});

export default HomeScreen;
