import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import TabLayout from '../../components/layout/TabLayout';
import StackHeader from '../../components/Header/StackHeader';
import {useAppContext} from '../../appStore/context';
import {Hobbies} from '../../data/hobbieTypes';
import NoEvents from '../../components/TabEventsComponents/NoEvents';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabHeader from '../../components/Header/TabHeader';

const getHobbieColor = hobbie => {
  const colors = {
    Music: '#FF9500',
    Sports: '#FF2D55',
    Travel: '#34A853',
    Food: '#FFD60A',
    Fashion: '#EF4123',
    Books: '#4F3CC9',
    Art: '#FFD60A',
    Movies: '#F47230',
    Games: '#FF2D55',
    Technology: '#9E9E9E',
    Science: '#34A853',
    History: '#34A853',
    Art: '#007AFF',
    Writing: '#007AFF',
  };
  return colors[hobbie] || '#FFFFFF';
};

const TabHobbiesScreen = () => {
  const {hobbies, deleteHobby} = useAppContext();
  const [selectedType, setSelectedType] = useState('All');
  const [expandedEventId, setExpandedEventId] = useState(null);
  console.log(hobbies);

  const toggleEventExpansion = id => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  const filteredHobbies =
    selectedType === 'All'
      ? hobbies
      : hobbies.filter(hobbie => hobbie.type.title === selectedType);

  const getSectionTitle = () => {
    if (selectedType === 'All') return 'All Hobbies';
    return `${selectedType}`;
  };

  const handleDeleteHobby = id => {
    deleteHobby(id);
  };

  return (
    <TabLayout>
      <View style={styles.mainContainer}>
        <View style={styles.headerSection}>
          <TabHeader title={'Hobbie'} />

          <ScrollView
            horizontal
            contentContainerStyle={{gap: 5}}
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                {borderColor: '#FFFFFF'},
                selectedType === 'All' && {backgroundColor: '#FFFFFF'},
              ]}
              onPress={() => setSelectedType('All')}>
              <Text
                style={[
                  styles.filterText,
                  selectedType === 'All' && {color: '#000000'},
                ]}>
                All
              </Text>
            </TouchableOpacity>

            {Hobbies.map(event => (
              <TouchableOpacity
                key={event.id}
                style={[
                  styles.filterButton,
                  {borderColor: getHobbieColor(event.title)},
                  selectedType === event.title && {
                    backgroundColor: getHobbieColor(event.title),
                  },
                ]}
                onPress={() => setSelectedType(event.title)}>
                <Text style={styles.filterText}>{event.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{getSectionTitle()}</Text>
          </View>
        </View>

        <ScrollView
          style={styles.hobbiesList}
          contentContainerStyle={styles.hobbiesListContent}
          showsVerticalScrollIndicator={false}>
          {filteredHobbies.length === 0 ? (
            <NoEvents />
          ) : (
            filteredHobbies.map(hobbie => (
              <TouchableOpacity
                key={hobbie.id}
                style={styles.eventCard}
                onPress={() => toggleEventExpansion(hobbie.id)}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{hobbie.title}</Text>
                  <Icon
                    name={
                      expandedEventId === hobbie.id
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    size={24}
                    color="#8E8E93"
                  />
                </View>
                {expandedEventId === hobbie.id && (
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventDescription}>
                      {hobbie.description}
                    </Text>
                    {/* <View><Text>{hobbie.description}</Text></View> */}

                    <TouchableOpacity
                      style={styles.rulesButton}
                      onPress={() => handleDeleteHobby(hobbie.id)}>
                      <Text style={styles.rulesButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </TabLayout>
  );
};

export default TabHobbiesScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerSection: {
    padding: 20,
    paddingBottom: 0,
  },
 
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  hobbiesList: {
    flex: 1,
  },
  hobbiesListContent: {
    padding: 20,
    paddingTop: 0,
  },
  bottomSpacing: {
    height: 80,
  },
  eventCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  eventDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  eventDetails: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    color: '#8E8E93',
    fontSize: 14,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  rulesButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF2D55',
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  rulesButtonText: {
    color: '#FF2D55',
    fontSize: 14,
  },
  allFilterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    borderColor: '#FFFFFF',
  },
  allFilterTextSelected: {
    color: '#000000',
  },
});
