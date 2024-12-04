import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StackLaout from '../../components/layout/StackLaout';
import StackHeader from '../../components/Header/StackHeader';

const StackCreatHobbie = () => {
  return (
    <StackLaout>
      <StackHeader title={'Create Hobbie'}/>
    </StackLaout>
  );
};

export default StackCreatHobbie;

const styles = StyleSheet.create({});
