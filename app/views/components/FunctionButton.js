import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../config/Colors';


function FunctionButton(props) {

    const {value, onPress, shrinkFont} = props

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={[styles.buttonText, shrinkFont ? styles.shrinkFont : '']}>{value}</Text>
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
        backgroundColor: Colors.LightField
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
    shrinkFont: {
        fontSize: 40
    },
})

export default FunctionButton