import React, { createContext, useState, useEffect } from 'react';
import {
  getLocalData,
  saveLocalData,
} from 'src/@crema/services/Application/LocalStorage';
import { useLocation } from 'react-router-dom';

const PageHistoryContext = createContext();

const KEY_HISTORY = 'pageHistory';
const LIMIT_HISTORY = 30;

export const PageHistoryProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [pageHistory, setPageHistory] = useState([]);

  useEffect(() => {
    const storedHistory = getLocalData(KEY_HISTORY);
    if (storedHistory) {
      setPageHistory(storedHistory);
    }
  }, []);

  const addPageToHistory = (page) => {
    setPageHistory((prevHistory) => {
      let newHistory = [...prevHistory, page];
      if (newHistory.length > LIMIT_HISTORY) {
        newHistory = newHistory.slice(newHistory.length - LIMIT_HISTORY);
      }
      saveLocalData(KEY_HISTORY, newHistory);
      return newHistory;
    });
  };

  useEffect(() => {
    if (pathname) addPageToHistory(pathname);
  }, [pathname]);

  return (
    <PageHistoryContext.Provider value={{ pageHistory }}>
      {children}
    </PageHistoryContext.Provider>
  );
};

export default PageHistoryContext;
