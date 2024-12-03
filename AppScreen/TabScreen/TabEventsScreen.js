import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TabLayout from '../../components/layout/TabLayout';
import {useAppContext} from '../../appStore/context';
import {Events} from '../../data/events';
import Icon from 'react-native-vector-icons/Ionicons';
import NoEvents from '../../components/TabEventsComponents/NoEvents';

const TabEventsScreen = () => {
  const {allEvents,deleteEvent} = useAppContext();
  const [selectedType, setSelectedType] = useState('All');
  const [expandedEventId, setExpandedEventId] = useState(null);
  console.log(allEvents);

  const getEventColor = title => {
    const colors = {
      Meeting: '#FF9500',
      Supper: '#0A84FF',
      Party: '#FF2D55',
      Conference: '#FF3B30',
      Seminar: '#34C759',
      Training: '#5856D6',
      Wedding: '#AF52DE',
      Birthday: '#FF2D55',
      Exhibition: '#FFD60A',
      Concert: '#64D2FF',
    };
    return colors[title] || '#FFFFFF';
  };

  const toggleEventExpansion = id => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  const filteredEvents =
    selectedType === 'All'
      ? allEvents
      : allEvents.filter(event => event.type === selectedType);

  const getSectionTitle = () => {
    if (selectedType === 'All') return 'All Events';
    return `${selectedType}s`;
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    console.log(id)
  };

  return (
    <TabLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Events</Text>
          <TouchableOpacity>
            <Text style={styles.dateText}>23 Jan</Text>
          </TouchableOpacity>
        </View>

        {/* Filter */}
        <ScrollView
          horizontal
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

          {Events.map(event => (
            <TouchableOpacity
              key={event.id}
              style={[
                styles.filterButton,
                {borderColor: getEventColor(event.title)},
                selectedType === event.title && {
                  backgroundColor: getEventColor(event.title),
                },
              ]}
              onPress={() => setSelectedType(event.title)}>
              <Text style={styles.filterText}>{event.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{getSectionTitle()}</Text>
        </View>

        {/* Events */}
        <ScrollView style={styles.eventsList}>
          {filteredEvents.length === 0 ? (
            <NoEvents />
          ) : (
            filteredEvents.map(event => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                onPress={() => toggleEventExpansion(event.id)}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Icon
                    name={
                      expandedEventId === event.id
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    size={24}
                    color="#8E8E93"
                  />
                </View>
                <Text style={styles.eventDescription}>{event.description}</Text>
                {expandedEventId === event.id && (
                  <View style={styles.eventDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Date</Text>
                      <Text style={styles.detailValue}>{event.date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Time</Text>
                      <Text style={styles.detailValue}>{event.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Place</Text>
                      <Text style={styles.detailValue}>{event.location}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Dresscode</Text>
                      <Text style={styles.detailValue}>{event.type}</Text>
                    </View>
                    {/* <TouchableOpacity style={styles.rulesButton}>
                    <Text style={styles.rulesButtonText}>Check rules</Text>
                  </TouchableOpacity> */}
                    <TouchableOpacity
                      style={styles.rulesButton}
                      onPress={() => handleDeleteEvent(event.id)}>
                      <Text style={styles.rulesButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </TabLayout>
  );
};

export default TabEventsScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 16,
    color: '#0A84FF',
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
  eventsList: {
    // flex: 1,
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
    marginTop: 8,
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
