import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import TabLayout from '../../components/layout/TabLayout';
import { useAppContext } from '../../appStore/context';
import Icon from 'react-native-vector-icons/Ionicons';

const TabRulesScreen = () => {
  const { etiquetteRules } = useAppContext();
  const [activeTab, setActiveTab] = useState('General'); // 'General' or 'Created'
  const [expandedRuleId, setExpandedRuleId] = useState(null);

  const toggleRule = (id) => {
    setExpandedRuleId(expandedRuleId === id ? null : id);
  };

  const RuleItem = ({ rule }) => {
    const isExpanded = expandedRuleId === rule.id;

    return (
      <View style={styles.ruleItem}>
        <TouchableOpacity 
          style={styles.ruleHeader} 
          onPress={() => toggleRule(rule.id)}
        >
          <Text style={styles.ruleTitle}>{rule.title}</Text>
          <View style={styles.ruleActions}>
            {/* <TouchableOpacity style={styles.editButton}>
              <Icon name="pencil" size={20} color="#0A84FF" />
            </TouchableOpacity> */}
            <Icon 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#8E8E93" 
            />
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <Text style={styles.ruleContent}>
            {rule.rule}
          </Text>
        )}
      </View>
    );
  };

  const GeneralRules = () => {
    return etiquetteRules.map(rule => (
      <RuleItem key={rule.id} rule={rule} />
    ))
  }

  const CreatedRules = () => {
    return <Text>Created</Text>
  }

  return (
    <TabLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Etiquette rules</Text>
        
        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'Created' && styles.activeTab
            ]}
            onPress={() => setActiveTab('Created')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'Created' && styles.activeTabText
            ]}>Created</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'General' && styles.activeTab
            ]}
            onPress={() => setActiveTab('General')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'General' && styles.activeTabText
            ]}>General</Text>
          </TouchableOpacity>
        </View>

        {/* Rules List */}
        <ScrollView style={styles.rulesList}>
          {activeTab === 'General' ? GeneralRules() : CreatedRules()}
          {/* {etiquetteRules.map(rule => (
            <RuleItem key={rule.id} rule={rule} />
          ))} */}
        </ScrollView>
      </View>
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
  ruleItem: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  ruleTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  ruleActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  editButton: {
    padding: 4,
  },
  ruleContent: {
    color: '#FFFFFF',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
    lineHeight: 20,
  },
});

export default TabRulesScreen;
