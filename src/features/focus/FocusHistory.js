import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

export const FocusHistory = ({ focusHistory, setFocusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  const HistoryItem = ({ item, index }) => {

    return (
      <Text style={styles.historyItem(item.status)}>{item.subject}</Text>
    )
  }

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
              <Text style={styles.title}>Things we have focused on</Text>

            
              <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1, alignItems: 'center' }}
                data={focusHistory}
                renderItem={HistoryItem}
              />

              <View style={styles.clearContainer}>
                <RoundedButton size={74} title="clear" onPress={() => onClear()} />
              </View>

            </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md
  }
})
