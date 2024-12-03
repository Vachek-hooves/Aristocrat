import {StyleSheet, Text, View} from 'react-native';
import TabLayout from '../../components/layout/TabLayout';
import {useAppContext} from '../../appStore/context';
const TabRulesScreen = () => {
  const {etiquetteRules} = useAppContext();
  console.log('Etiquette Rules:', etiquetteRules);
  
  return <TabLayout>
    {etiquetteRules.map(rule => (
      <View key={rule.id} style={styles.ruleContainer}>
        <Text style={styles.ruleTitle}>{rule.title}</Text>
        <Text style={styles.ruleText}>{rule.rule}</Text>
      </View>
    ))}
  </TabLayout>;
};

export default TabRulesScreen;

const styles = StyleSheet.create({
  ruleContainer: {
    marginBottom: 20,
  },
  ruleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ruleText: {
    fontSize: 16,
  },
});
