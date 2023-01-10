import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../config/Colors';


function NumericButton(props) {

    const {value, appendNumber} = props

    return (
        <TouchableOpacity style={[styles.button, value === 0 ? styles.zeroButton : '']} onPress={() => appendNumber(`${value}`)}>
            <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 80,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: Colors.DarkField
    },
    zeroButton: {
        width: 170,
        alignItems: 'flex-start',
        paddingLeft: 27,
    },
    buttonText: {
        color: Colors.White,
        textAlign: 'center',
        textAlignVertical: 'center',

        fontSize: 50
    },
})

export default NumericButton