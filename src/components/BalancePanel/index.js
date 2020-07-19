import React from 'react';
import { View, Button } from 'react-native';

import BalancePanelLabel from './BalancePanelLabel';
import BalancePanelChart from './BalancePanelChart';

import styles from './styles';

export default function BalancePanel() {
  return (
    <View>
      <BalancePanelLabel />
      <BalancePanelChart />
    </View>
  );
}
