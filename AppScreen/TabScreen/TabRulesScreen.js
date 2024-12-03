import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TabLayout from '../../components/layout/TabLayout';
import {useAppContext} from '../../appStore/context';
import GeneralRule from '../../components/TabRulesComponent/GeneralRule';
import CreatedRule from '../../components/TabRulesComponent/CreatedRule';

const TabRulesScreen = ({navigation}) => {
  const {etiquetteRules, createdRules} = useAppContext();
  const [activeTab, setActiveTab] = useState('General'); // 'General' or 'Created'

  const GeneralRules = () => {
    return etiquetteRules.map(rule => (
      <GeneralRule key={rule.id} rule={rule} />
    ));
  };

  const CreatedRules = () => {
    return createdRules.length > 0 ? (
      createdRules.map(rule => <CreatedRule key={rule.id} rule={rule} />)
    ) : (
      <Text style={{color: '#FFFFFF', fontSize: 24, textAlign: 'center'}}>
        No created rules
      </Text>
    );
  };

  return (
    <TabLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Etiquette rules</Text>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Created' && styles.activeTab]}
            onPress={() => setActiveTab('Created')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Created' && styles.activeTabText,
              ]}>
              Created
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'General' && styles.activeTab]}
            onPress={() => setActiveTab('General')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'General' && styles.activeTabText,
              ]}>
              General
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rules List */}
        <ScrollView
          style={styles.rulesList}
          showsVerticalScrollIndicator={false}>
          {activeTab === 'General' ? GeneralRules() : CreatedRules()}
        </ScrollView>
      </View>
      <View style={{height: 90}} />
    </TabLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 2,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 18,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  activeTabText: {
    color: '#000000',
  },
  rulesList: {
    flex: 1,
  },
  createRuleBtn: {
    backgroundColor: '#0A84FF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  createRuleBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TabRulesScreen;
