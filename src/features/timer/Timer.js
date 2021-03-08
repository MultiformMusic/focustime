import React, {useState} from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

const DEFAULT_TIME = 0.1;

export const Timer = ({focusSubject, onTimerEnd, clearSubject}) => {

  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isSarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = progress => {

    setProgress(progress);
  }

  const vibrate = () => {

    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 2000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  }

  const onEnd = () => {

    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const changeTime = min => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.countdown}>
        <Countdown minutes={minutes} isPaused={!isSarted} onProgress={onProgress} onEnd={onEnd} />
      </View>
      
      <View style={{paddingTop: spacing.xl}}>
        <Text style={styles.title}>Focusing on : </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      
      <View style={{paddingTop: spacing.md}}>
        <ProgressBar progress={progress} color="#5E84E2" style={{ height: 10}}/>
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
      { isSarted ? 
      <RoundedButton title="pause" size={80} onPress={() => setIsStarted(false)}/> : <RoundedButton title="start" size={80} onPress={() => setIsStarted(true)
      }/>}
      </View>
      
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center"
  },
  task: {
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center"
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
});
