import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const CreatedRule = ({rule}) => {
  const [expandedRuleId, setExpandedRuleId] = useState(null);

  const toggleRule = id => {
    setExpandedRuleId(expandedRuleId === id ? null : id);
  };

  const isExpanded = expandedRuleId === rule.id;

  return (
    <View style={styles.ruleItem}>
      <TouchableOpacity
        style={styles.ruleHeader}
        onPress={() => toggleRule(rule.id)}>
        <Text style={styles.ruleTitle}>{rule.title}</Text>
        <View style={styles.ruleActions}>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="pencil" size={20} color="#0A84FF" />
          </TouchableOpacity>
          <Icon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#8E8E93"
          />
        </View>
      </TouchableOpacity>

      {isExpanded && <Text style={styles.ruleContent}>{rule.rule}</Text>}
    </View>
  );
};

export default CreatedRule;

const styles = StyleSheet.create({
  ruleItem: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginBottom: 12,
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
    fontSize: 20,
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
    fontSize: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    lineHeight: 20,
  },
});
