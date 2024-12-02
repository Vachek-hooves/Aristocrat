import {createContext, useContext, useState, useEffect} from 'react';
import {initEtiquetteRules, loadEtiquetteRules} from './utils';

const AppContext = createContext({
  etiquetteRules: [],
});

export const Provider = ({children}) => {
  const [etiquetteRules, setEtiquetteRules] = useState([]);
  

  useEffect(() => {
    const loadAppData = async () => {
      try {
        const loadedRules = await loadEtiquetteRules();
        if (loadedRules === null) {
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

  const value = {etiquetteRules};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a Provider');
  }
  return context;
};
