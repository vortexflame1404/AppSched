import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  TopNavigation,
  Icon,
  TopNavigationAction,
  Divider,
  Layout,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { addDays, parseISO } from 'date-fns';
import axios from 'axios';
import WeekView from 'react-native-week-view';
import { AuthContext } from '../navigations';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const ProfSchedScreen = ({ route, navigation }) => {
  const host = route.params;
  const navigateBack = () => navigation.goBack();
  const { state } = React.useContext(AuthContext);
  const BackAction = (props) => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [disableEvents, setDisableEvents] = React.useState([]);
  React.useEffect(() => {
    const fetchDisableEvents = async () => {
      const end = addDays(selectedDate, 5);
      console.log('inside fetchDisableEvents');
      try {
        const response = await axios.get(
          `users/${state.userId}/unavailableTime/${host._id}`,
          {
            params: {
              startDate: selectedDate.toISOString(),
              endDate: end.toISOString(),
            },
          },
        );
        const tempDisableEvents = response.data;
        tempDisableEvents.forEach((event, index) => {
          event.id = index;
          event.description = 'disable';
          event.startDate = parseISO(event.startDate);
          event.endDate = parseISO(event.endDate);
          event.color = '#696969';
        });
        console.log(tempDisableEvents);
        setDisableEvents(tempDisableEvents);
      } catch (e) {
        console.log('in fetchDisableEvents', e);
      }
    };
    fetchDisableEvents();
  }, [host._id, selectedDate, state.userId]);

  const onEventPress = ({ id, color, startDate, endDate, description }) => {
    if (color === '#696969') {
      Toast.show("Can't choose this time period", Toast.SHORT, ['UIAlertController']);
      return;
    }
    navigation.navigate('Detail', {
      id: id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      description: description,
    });
    console.log(color);
  };

  const onGridClick = (pressEvent, startHour, date) => {
    console.log(`start hour: ${startHour}`);
    console.log(pressEvent instanceof Object);
    console.log(startHour instanceof Number);
    console.log(date instanceof Date);
    if (startHour > 16 || startHour < 9) {
      Toast.show('Outside of working hour', Toast.SHORT, ['UIAlertController']);
      return;
    }
    console.log('here');
  };

  // event object
  // {
  //   id: 1,
  //     description: 'Event',
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   color: 'blue',
  //   // ... more properties if needed,
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={`${host.name}'s schedule`}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styling.container}>
        <WeekView
          events={disableEvents}
          selectedDate={selectedDate}
          numberOfDays={5}
          hourTextStyle={{ color: '#000000' }}
          onEventPress={(event) => onEventPress(event)}
          onGridClick={onGridClick}
          headerStyle={style.headerStyle}
          formatDateHeader="MMM D"
          hoursInDisplay={6}
          startHour={9}
          onSwipeNext={(event) => {
            setSelectedDate(event);
            console.log(event);
          }}
          onSwipePrev={(event) => {
            setSelectedDate(event);
            console.log(event);
          }}
        />
      </Layout>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#3366FF',
    color: '#fff',
    borderColor: '#696969',
  },
  hourText: {
    color: 'white',
  },
});

const styling = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'baseline',
    justifyContent: 'space-between',
  },
});

export default ProfSchedScreen;
