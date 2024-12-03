import AsyncStorage from '@react-native-async-storage/async-storage';
import {EtiquetteRules} from '../data/rules';
// console.log(EtiquetteRules, 'EtiquetteRules');

const STORAGE_KEY = 'etiquetteRules';
const EVENTS_KEY = 'events';


export const initEtiquetteRules = async () => {
  try {
    console.log(EtiquetteRules, 'EtiquetteRules');
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(EtiquetteRules));
    return EtiquetteRules;
  } catch (error) {
    console.error('Failed to initialize etiquette rules:', error);
    return [];
  }
};

export const loadEtiquetteRules = async () => {
  try {
    const etiquetteRules = await AsyncStorage.getItem(STORAGE_KEY);
    return etiquetteRules ? JSON.parse(etiquetteRules) : [];
  } catch (error) {
    console.error('Failed to load etiquette rules:', error);
    return null;
  }
};


export const createNewEvent = (event, allEvents) => {
  return [...allEvents, event];
};

export const saveEventToStorage = async (events) => {
  try {
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to save events:', error);
  }
};

export const loadEventsFromStorage = async () => {
  try {
    const savedEvents = await AsyncStorage.getItem(EVENTS_KEY);
    // console.log(savedEvents);
    return savedEvents ? JSON.parse(savedEvents) : [];
  } catch (error) {
    console.error('Failed to load events:', error);
    return [];
  }
};
