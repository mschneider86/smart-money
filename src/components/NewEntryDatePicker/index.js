import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import Colors from '../../styles/Colors';

export default function NewEntryDatePicker({value, onChange}) {
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeValue = date => {
    onChange(date);
    onCancel();
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Icon name="today" size={30} color={Colors.white} />
      </TouchableOpacity>

      <DateTimePicker
        mode="date"
        datePickerModeAndroid="calendar"
        titleIOS="Data de vencimento"
        cancelTextIOS="Cancelar"
        confirmTextIOS="Ok"
        date={value}
        isVisible={modalVisible}
        onConfirm={onChangeValue}
        onCancel={onCancel}
      />
    </View>
  );
}
