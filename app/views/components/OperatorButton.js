import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../config/Colors';


function OperatorButton(props) {

    const {operator, onPress} = props

    const [symbol, setSymbol] = useState('')

    useEffect(() => {
        switch (operator) {
            case "ADD":
                setSymbol('+')
                break;
            case "SUB":
                setSymbol('-')
                break;
            case "MUL":
                setSymbol('×')
                break;
            case "DIV":
                setSymbol('÷')
                break;
            case "SUM":
                setSymbol('=')
                break;
            default:
                break;
        }
    }, [])

    return (
        <TouchableOpacity style={styles.button} onPress={() => onPress(operator)}>
            <Text style={styles.buttonText}>{symbol}</Text>
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
        backgroundColor: Colors.Accent
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

export default OperatorButton