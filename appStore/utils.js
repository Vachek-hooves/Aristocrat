import AsyncStorage from '@react-native-async-storage/async-storage';
import {EtiquetteRules} from '../data/rules';
// console.log(EtiquetteRules, 'EtiquetteRules');

const STORAGE_KEY = 'etiquetteRules';
const EVENTS_KEY = 'events';
const RULES_KEY = 'createdRules';
const HOBBIES_KEY = 'hobbies';

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

export const loadCreatedRulesFromStorage = async () => {
  try {
    const savedRules = await AsyncStorage.getItem(RULES_KEY);
    return savedRules ? JSON.parse(savedRules) : [];
  } catch (error) {
    console.error('Failed to load created rules:', error);
    return [];
  }
};

export const loadHobbiesFromStorage = async () => {
  try {
    const savedHobbies = await AsyncStorage.getItem(HOBBIES_KEY);
    return savedHobbies ? JSON.parse(savedHobbies) : [];
  } catch (error) {
    console.error('Failed to load hobbies:', error);
    return [];
  }
};

export const saveEventToStorage = async (events) => {
  try {
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to save events:', error);
  }
};

export const saveCreatedRuleToStorage=async (rules)=>{
try{
    await AsyncStorage.setItem(RULES_KEY, JSON.stringify(rules));
  } catch (error) {
    console.error('Failed to save created rules:', error);
  }
};

export const saveHobbiesToStorage = async (hobbies) => {
  try {
    await AsyncStorage.setItem(HOBBIES_KEY, JSON.stringify(hobbies));
  } catch (error) {
    console.error('Failed to save hobbies:', error);
  }
};

export const createNewEvent = (event, allEvents) => {
  return [...allEvents, event];
};

export const createNewRule = (rule, createdRules) => {
  return [...createdRules, rule];
};

export const createNewCreatedRule = (rule, createdRules) => {
  return [...createdRules, rule];
};

export const createNewHobby = (hobby, hobbies) => {
  return [...hobbies, hobby];
};
