import React from 'react';
import { StyleSheet, View } from 'react-native';
import WeekView from 'react-native-week-view';
import {
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

const HomeScreen = ({ route, navigation }) => {
  const [fetchData, setFetchData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState('');
  const { state } = React.useContext(AuthContext);
  const id = state.userId;
  const dateFormat = 'HH:mm dd/MM';

  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`users/${id}/appointments`);
        setFetchData(response.data);
        console.log(response.data);
      } catch (e) {
        console.log('in fetchAppointments, Homescreen', e.message);
        setIsError("can't get appointments");
      }
      setIsLoading(false);
    };
    fetchAppointments();
  }, [id]);

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index}`}
      description={`with ${item._host.name} from ${format(
        parseISO(item.startTime),
        dateFormat,
      )} to ${format(parseISO(item.endTime), dateFormat)}`}
      onPress={() => navigation.navigate('Detail', item)}
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
        {isLoading ? <LoadingIndicator /> : null}
        {isError.length === 0 ? null : (
          <Text category={'h6'} status={'danger'}>
            {isError}
          </Text>
        )}
        {fetchData.length === 0 && !isLoading ? (
          <Text category={'h5'}>No appointments</Text>
        ) : (
          <List
            style={{ maxHeight: 300 }}
            data={fetchData}
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
