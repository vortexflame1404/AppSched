import React, { useState } from 'react';
import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  Toggle,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { parseISO, format, addHours, setHours } from 'date-fns';
import { Divider } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../navigations';
import axios from 'axios';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AppointmentDetailsScreen = ({ route, navigation }) => {
  /////////////////////////////////////////
  // appointment example
  const example = {
    __v: 0,
    _guest: '5f86e6cca23f7839288bec74',
    _host: { _id: '5f87f621ac62552acc2240c9', name: 'Office 10' },
    _id: '5f8ac358cf2f2f233492fb2a',
    details: 'no details required',
    endTime: '2020-10-16T08:44:55.254Z',
    id: '5f8ac358cf2f2f233492fb2a',
    isApproved: false,
    startTime: '2020-10-16T07:44:55.254Z',
    title: 'Meeting 1',
  };
  ///////////////////////////////////
  // get params
  const appointment = route.params.item;
  const [startDate, setStartDate] = React.useState(
    parseISO(appointment.startTime),
  );
  let endDate = parseISO(appointment.endTime);
  const dateFormat = 'HH:mm dd/MM';

  const { state } = React.useContext(AuthContext);

  const formatAppointmentTime = (start, end) =>
    format(start, dateFormat) + ' to ' + format(end, dateFormat);
  const [scheduleTime, setScheduleTime] = useState(
    formatAppointmentTime(startDate, endDate),
  );

  const [title, setTitle] = useState(appointment.title); // replace w/ props
  const [detail, setDetail] = useState(appointment.details); // replace w/ props
  const [isApproved, setIsApproved] = useState(appointment.isApproved);

  const navigateBack = () => {
    route.params.onGoBack();
    navigation.popToTop();
  };
  const navigateToHostSched = () => {
    navigation.navigate('ProfSched', {
      _id: appointment._host._id,
      name: appointment._host.name,
      onGoBack: (startHour, date) => {
        const tmpStartDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          0,
          0,
          0,
        );
        const start = setHours(tmpStartDate, startHour);
        const end = addHours(start, 1);
        setStartDate(start);
        setScheduleTime(formatAppointmentTime(start, end));
      },
      fromAppointmentDetailsScreen: true,
    });
  };

  const saveAppointmentDetail = async () => {
    try {
      // console.log(startDate);
      const response = await axios.patch(
        `/users/${state.userId}/appointment/${appointment._id}/change`,
        {
          title: title,
          details: detail,
          isApproved: isApproved,
          startDate: startDate.toISOString(),
        },
      );
      if (response.status === 200) {
        // console.log(response.data);
        Toast.show('save', Toast.SHORT);
      }
    } catch (e) {
      // console.log('in press save', e);
    }
  };

  const deleteAppointment = async () => {
    try {
      const response = await axios.delete(
        `/users/${state.userId}/appointment/${appointment._id}/cancel`);
      if (response.status === 200) {
        Toast.show('deleted', Toast.SHORT, ['UIAlertController']);
      }
    } catch (e) {
      // console.log('in deleteappointment', e);
    }
  };

  const BackAction = (props) => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Details"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Layout style={styling.form}>
        <Input value={title} onChangeText={(input) => setTitle(input)} />
        <Text category={'h2'}>
          {state.userDetails._host
            ? appointment._guest.name
            : appointment._host.name}
        </Text>
        <Button
          style={{ margin: 2 }}
          appearance="outline"
          onPress={() => navigateToHostSched()}>
          {scheduleTime}
        </Button>
        <Input
          value={detail}
          multiline={true}
          textAlignVertical={'top'}
          numberOfLines={3}
          onChangeText={(input) => setDetail(input)}
        />
        {state.userDetails._host ? (
          <Toggle
            checked={isApproved}
            onChange={(checked) => {
              setIsApproved(checked);
            }}>
            APPROVED
          </Toggle>
        ) : null}
        <Layout
          style={{
            margin: 20,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Button
            style={{ margin: 20 }}
            onPress={() => saveAppointmentDetail()}>
            SAVE
          </Button>
          <Button style={{ margin: 20 }} onPress={() => deleteAppointment()}>
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
    justifyContent: 'center',
    // width: '80%',
  },
});

export default AppointmentDetailsScreen;
