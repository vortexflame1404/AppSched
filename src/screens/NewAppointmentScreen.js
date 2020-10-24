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
import axios from 'axios';
import { parseISO, format, addHours, setHours } from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../navigations';
import Toast from 'react-native-simple-toast';
import { LoadingIndicator } from '../components/LoadingIndicator';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const NewAppointmentScreen = ({ route, navigation }) => {
  // get params
  const { host, startHour, date } = route.params;
  const dateStore = parseISO(date);
  let startDate = new Date(
    dateStore.getFullYear(),
    dateStore.getMonth(),
    dateStore.getDate(),
    startHour,
    0,
    0,
  );
  let endDate = addHours(startDate, 1);
  const dateFormat = 'HH:mm dd/MM';
  const { state } = React.useContext(AuthContext);

  const scheduleTime =
    format(startDate, dateFormat) + ' to ' + format(endDate, dateFormat);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [title, setTitle] = useState(''); // replace w/ props
  const [detail, setDetail] = useState(''); // replace w/ props

  const navigateBack = () => navigation.goBack();
  const BackAction = (props) => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  // post to create appointment
  const postCreateAppointment = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `/users/${state.userId}/appointment/create/${host._id}`,
        {
          title: title,
          details: detail,
          startTime: startDate.toISOString(),
          _host: host._id,
          _guest: state.userId,
        },
      );
      if (response.status === 201) {
        Toast.show('appointment created successfully', Toast.SHORT, [
          'UIAlertController',
        ]);
        navigateBack();
      }
    } catch (e) {
      setIsLoading(false);
      setIsError("can't create appointment");
      // console.log('in create appointment', e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Create new appointment"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <View style={{ height: 50, background: '#ffffff' }} />
      <Layout style={styling.form}>
        <Input
          placeholder={'TITLE'}
          size={'large'}
          value={title}
          onChangeText={(input) => setTitle(input)}
        />
        <Text style={{ margin: 15 }} category={'h6'}>
          {host.name}
        </Text>
        <Text style={{ margin: 15 }}>{scheduleTime}</Text>
        <Input
          value={detail}
          size={'large'}
          numberOfLines={3}
          textAlignVertical={'top'}
          multiline={true}
          placeholder={'DETAILS'}
          onChangeText={(input) => setDetail(input)}
        />
        {isError !== '' ? <Text status={'danger'}>{isError}</Text> : null}
        {isLoading ? <LoadingIndicator /> : null}
        <Layout
          style={{
            margin: 20,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Button
            style={{ margin: 20 }}
            onPress={() => postCreateAppointment()}>
            SAVE
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styling = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    // width: '80%',
  },
});

export default NewAppointmentScreen;
