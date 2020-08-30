import React from 'react';
import {View, ScrollView} from 'react-native';

import BalancePanel from '../../components/BalancePanel';
import EntrySummary from '../../components/EntrySummary';
import EntryList from '../../components/EntryList';

import Colors from '../../styles/Colors';

import styles from './styles';

const Main = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BalancePanel onNewEntryPress={() => navigation.navigate('NewEntry')} />
      <ScrollView>
        <EntrySummary
          onPressActionButton={() => navigation.navigate('Report')}
        />
        <EntryList
          onEntryPress={entry => {
            const entryToJson = JSON.parse(JSON.stringify(entry));
            navigation.navigate('NewEntry', {
              entry: entryToJson,
            });
          }}
          onPressActionButton={() => navigation.navigate('Report')}
        />
      </ScrollView>
    </View>
  );
};

export default Main;
