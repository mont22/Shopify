import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SelectAllToggleProps {
  allSelected: boolean;
  toggleSelectAll: () => void;
}

const SelectAllToggle: React.FC<SelectAllToggleProps> = ({ allSelected, toggleSelectAll }) => {
  return (
    <View className="flex-row items-center px-4 py-2">
      <TouchableOpacity onPress={toggleSelectAll}>
        <Ionicons
          name={allSelected ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color="green"
        />
      </TouchableOpacity>
      <Text className="ml-2">Select all</Text>
      <TouchableOpacity className="ml-auto">
        <Ionicons name="trash-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SelectAllToggle;
