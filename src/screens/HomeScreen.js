import React from 'react';
import { StyleSheet, View } from 'react-native';
import WeekView from 'react-native-week-view';
import {
  Button,
  Divider,
  Layout,
  List,
  ListItem,
  Text,
  Toggle,
  TopNavigation,
} from '@ui-kitten/components';
import { add, parseJSON, parseISO, format } from 'date-fns';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from 'react-native-reanimated';
import { AuthContext } from '../navigations';
import { LoadingIndicator } from '../components/LoadingIndicator';

const HomeScreen = ({ route, navigation }) => {
  const [dataToShow, setDataToShow] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [approvedAppointments, setApprovedAppointments] = React.useState([]);
  const [pendingAppointments, setPendingAppointments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState('');
  const { state } = React.useContext(AuthContext);
  const id = state.userId;
  const isHost = state.userDetails._host;
  const dateFormat = 'HH:mm dd/MM';

  const [showApproved, setShowApproved] = React.useState(true);
  React.useEffect(() => {
    // console.log('in showapprov');
    showApproved
      ? setDataToShow(approvedAppointments)
      : setDataToShow(pendingAppointments);
  }, [approvedAppointments, pendingAppointments, showApproved]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`users/${id}/appointments`);
      setApprovedAppointments(response.data.filter((app) => app.isApproved));
      setPendingAppointments(response.data.filter((app) => !app.isApproved));
      // console.log(pendingAppointments.length);
    } catch (e) {
      // console.log('in fetchAppointments, Homescreen', e.message);
      // setIsError("can't get appointments");
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`users/${id}/appointments`);
        setApprovedAppointments(response.data.filter((app) => app.isApproved));
        setPendingAppointments(response.data.filter((app) => !app.isApproved));
      } catch (e) {
        // console.log('in fetchAppointments, Homescreen', e.message);
        setIsError("can't get appointments");
      }
      setIsLoading(false);
    };

    fetchAppointments();
  }, [id]);

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index}`}
      description={`with ${
        isHost ? item._guest.name : item._host.name
      } from ${format(parseISO(item.startTime), dateFormat)} to ${format(
        parseISO(item.endTime),
        dateFormat,
      )}`}
      onPress={() =>
        navigation.navigate('Detail', {
          item: item,
          onGoBack: () => fetchAppointments(),
        })
      }
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Home" alignment="center" />
      <Divider />
      <Layout style={styling.container}>
        <View style={{ alignItems: 'center' }}>
          <Text category={'h1'}>MY APPOINTMENTS</Text>
        </View>
        <Divider style={{ height: 30 }} />
        <View style={{ alignItems: 'center' }}>
          <Toggle
            checked={showApproved}
            onChange={(checked) => {
              setShowApproved(checked);
            }}>
            {showApproved ? 'APPROVED APPOINTMENTS' : 'PENDING APPOINTMENTS'}
          </Toggle>
        </View>
        {isLoading ? <LoadingIndicator /> : null}
        {isError.length === 0 ? null : (
          <Text category={'h6'} status={'danger'}>
            {isError}
          </Text>
        )}
        {approvedAppointments.length === 0 &&
        pendingAppointments.length === 0 &&
        !isLoading ? (
          <Text category={'h5'}>No appointments</Text>
        ) : (
          <List
            style={{ maxHeight: 380 }}
            data={dataToShow}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styling = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default HomeScreen;
