import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Focus } from './src/features/focus/Focus';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes'
import { Timer } from './src/features/timer/Timer';
import { FocusHistory } from './src/features/focus/FocusHistory';

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2,
}

export default function App() {

  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {

    setFocusHistory([...focusHistory, {key: String(focusHistory.length + 1) ,subject, status}])
  }

  const onClear = () => {
    setFocusHistory([]);
  }

  const saveFocusHistory = async () => {

    try {

      AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));

    } catch (e) {
      console.lod(e);
    }
  }

  const loadFocusHistory = async () => {

    try {

      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length) {

        setFocusHistory(JSON.parse(history));
      }

    } catch (e) {
      console.lod(e);
    }
  }

  useEffect(() => {

      saveFocusHistory();

  }, [focusHistory])

  useEffect(() => {
    loadFocusHistory();
  }, [])

  console.log(focusHistory);

  return (
    <View style={styles.container}>
      {focusSubject ? <Timer 
        focusSubject={focusSubject} 
        clearSubject={() => {
          addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED)
          setFocusSubject(null);
          }}
        onTimerEnd={() => {
          addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETED)
          setFocusSubject(null);
        }} 
      /> : 
        <View style={{flex: 1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
        
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === "ios" ? spacing.xl : spacing.lg
  },
});
