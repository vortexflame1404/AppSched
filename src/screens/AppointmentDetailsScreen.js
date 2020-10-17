import React, { useState } from 'react';
import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { parseISO, format, add } from 'date-fns';
import { Divider } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AppointmentDetailsScreen = ({ route, navigation }) => {
  // get params
  const item = route.params;
  let startDate = parseISO(item.startTime);
  let endDate = parseISO(item.endTime);
  const dateFormat = 'HH:mm dd/MM';

  const [scheduleTime, setScheduleTime] = useState(
    format(startDate, dateFormat) + ' to ' + format(endDate, dateFormat),
  );
  const [selectedDate, setSelectedDate] = useState('');
  const [title, setTitle] = useState('sample title'); // replace w/ props
  const [detail, setDetail] = useState(item.details); // replace w/ props
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const navigateBack = () => navigation.goBack();

  const BackAction = (props) => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // TODO: retrieve selected date
  // https://stackoverflow.com/questions/54740423/how-to-show-selected-date-and-time-in-textinput-in-react-native
  const handleConfirm = (date) => {
    console.log('A date has been picked: ', date);
    startDate = date;
    endDate = add(startDate, { hours: 1 });
    setScheduleTime(
      format(startDate, dateFormat) + ' to ' + format(endDate, dateFormat),
    );
    hideDatePicker();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Details"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Layout style={styling.form}>
        <Input value={title} onChangeText={(input) => setTitle(input)} />
        <Text category={'h2'}>{item._host.name}</Text>
        <Button
          onPress={() => showDatePicker()}
          style={{ margin: 2 }}
          appearance="outline">
          {scheduleTime}
        </Button>
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Input
          value={detail}
          multiline={true}
          onChangeText={(input) => setDetail(input)}
        />
        <Layout
          style={{
            margin: 20,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Button
            style={{ margin: 20 }}
            onPress={() => console.log('save pressed')}>
            SAVE
          </Button>
          <Button
            style={{ margin: 20 }}
            onPress={() => console.log('cancel pressed')}>
            DELETE
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styling = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    // width: '80%',
  },
  // set width to fit text
  buttonOuterLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonLayout: {
    marginBottom: 10,
  },
});

export default AppointmentDetailsScreen;
