import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import GoBackHeader from '../components/GoBackHeader'

export default function BuyModal(props) {
    return (
        <View style={styles.container}>
            <GoBackHeader navigation={props.navigation} />
            <Text>Buy</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });
