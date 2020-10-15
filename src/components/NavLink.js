import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';

const NavLink = ({ text, routeName }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Layout style={{ margin: 15 }}>
        <Text status="info">{text}</Text>
      </Layout>
    </TouchableOpacity>
  );
};

export default NavLink;
