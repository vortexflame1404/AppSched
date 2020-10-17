import React from 'react';
import { View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

export const LoadingIndicator = (props) => (
  <View
    style={[props.style, { justifyContent: 'center', alignItems: 'center' }]}>
    <Spinner size={'medium'} />
  </View>
);
