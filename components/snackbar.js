import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SnackBar = (props) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{props.text}</Text>
        </View>
    )
}

export default SnackBar