import {StyleSheet, Text, View} from 'react-native';
import TabLayout from '../../components/layout/TabLayout';
import {useAppContext} from '../../appStore/context';

const TabEventsScreen = () => {
  const {allEvents} = useAppContext();
  console.log(allEvents);

  
  return <TabLayout></TabLayout>;
};

export default TabEventsScreen;

const styles = StyleSheet.create({});
