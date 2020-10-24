import React from 'react';
import { View } from 'react-native';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function TestScreen({ route, navigation }) {
  const navigateBack = () => navigation.goBack();

  const BackAction = (props) => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TopNavigation
        title="Test Screen"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Text category={'h1'}>Test Screen</Text>
    </View>
  );
}

export default TestScreen;
