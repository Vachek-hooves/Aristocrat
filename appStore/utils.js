import AsyncStorage from '@react-native-async-storage/async-storage';
import {EtiquetteRules} from '../data/rules';

const STORAGE_KEY = 'etiquetteRules';

export const initEtiquetteRules = async () => {
  try {
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
