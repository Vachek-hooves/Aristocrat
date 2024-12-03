import {createContext, useContext, useState, useEffect} from 'react';
import {
  initEtiquetteRules,
  loadEtiquetteRules,
  loadEventsFromStorage,
  createNewEvent,
  saveEventToStorage,
  createNewRule,
  saveCreatedRuleToStorage,
  loadCreatedRulesFromStorage,
} from './utils';

const AppContext = createContext({
  etiquetteRules: [],
  allEvents: [],
  createdRules: [],
  saveEvent: () => {},
  deleteEvent: () => {},
  addCreatedRule: () => {},
  saveCreatedRule: () => {},
});

export const Provider = ({children}) => {
  const [etiquetteRules, setEtiquetteRules] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [createdRules, setCreatedRules] = useState([]);

  useEffect(() => {
    const loadAppData = async () => {
      const events = await loadEventsFromStorage();
      setAllEvents(events);
      const createdRules = await loadCreatedRulesFromStorage();
      setCreatedRules(createdRules);
      try {
        const loadedRules = await loadEtiquetteRules();
        if (loadedRules.length === 0) {
          const initialRules = await initEtiquetteRules();
          setEtiquetteRules(initialRules);
        } else {
          setEtiquetteRules(loadedRules);
        }
      } catch (error) {
        console.error('Failed to load app data:', error);
        setEtiquetteRules([]);
      }
    };

    loadAppData();
  }, []);

  const saveEvent = async event => {
    const updatedEvents = createNewEvent(event, allEvents);
    setAllEvents(updatedEvents);
    await saveEventToStorage(updatedEvents);
  };

  const deleteEvent = async id => {
    // console.log(id)
    const updatedEvents = allEvents.filter(event => event.id !== id);
    setAllEvents(updatedEvents);
    await saveEventToStorage(updatedEvents);
  };

  const addCreatedRule = async rule => {
    const updatedRules = createNewRule(rule, createdRules);
    setCreatedRules(updatedRules);
    await saveCreatedRuleToStorage(updatedRules);
  };

  const saveCreatedRule = async rule => {
    const updatedRules = createNewRule(rule, createdRules);
    setCreatedRules(updatedRules);
    await saveCreatedRuleToStorage(updatedRules);
  };

  const value = {
    etiquetteRules,
    allEvents,
    createdRules,
    saveEvent,
    deleteEvent,
    addCreatedRule,
    saveCreatedRule,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a Provider');
  }
  return context;
};
