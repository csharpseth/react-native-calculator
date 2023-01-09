import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../config/Colors';

import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

function Calculator() {
    const [algo, setAlgo] = useState('0')

    const [sum, setSum] = useState(0.0)
    const [operator, setOperator] = useState('')
    
    const [sideA, setSideA] = useState(0.0)
    const [sideB, setSideB] = useState(0.0)

    const [sideASet, setSideASet] = useState(false)
    const [sideBSet, setSideBSet] = useState(false)

    const [clearAll, setClearAll] = useState(true)

    const ResetAlgo = () => {
        setAlgo('0')
    }

    const GetVarToWorkWith = () => {
        if(sideASet === false) {
            return 'A'
        } else if(sideBSet === false) {
            return 'B'
        }

        return 'SUM'
    }

    const AddToAlgo = (char) => {
        if(algo === '0' && char === '0') { return }

        if(algo === '0') {
            setAlgo(char)
        } else {
            setAlgo(algo + char)
        }

        setAlgo((algo) => {
            if(sideASet === false) { setSideA(ConvertToNumber(algo)) }
            else if(sideBSet === false) { setSideB(ConvertToNumber(algo)) }
            
            setClearAll(false)

            return algo
        })
    }

    

    const Clear = () => {
        if(clearAll) {
            ResetAlgo()

            setSideA(0)
            setSideB(0)

            setSideASet(false)
            setSideBSet(false)

            setSum(0)
            setOperator('')

            return
        }

        switch (GetVarToWorkWith()) {
            case 'A':
                setSideA(0)
                setSideA((sideA) => {
                    ResetAlgo()
                    setClearAll(true)
                    return sideA
                })
                break;
            case 'B':
                setSideB(0)
                setSideB((sideB) => {
                    ResetAlgo()
                    return sideB
                })
                break;
            default:
                break;
        }
    }

    const ConvertToNumber = (string) => {
        return Number.parseFloat(string)
    }

    const Calculate = () => {
        if(sideASet === false) {
            setAlgo(`${sideA}`)
            return
        } else {
            setSideBSet(true)
        }

        switch (operator) {
            case "ADD":
                setSum(sideA + sideB)
                break;
            case "SUB":
                setSum(sideA - sideB)
                break;
            case "MUL":
                setSum(sideA * sideB)
                break;
            case "DIV":
                if(sideB !== 0 ) {
                    setSum(sideA / sideB)
                }
                break;
        
            default:
                break;
        }
        
        setSum((sum) => {
            setSideA(sum)
            setAlgo(`${sum}`)
            setClearAll(true)

            return sum
        })
    }

    const ToggleSign = () => {
        switch (GetVarToWorkWith()) {
            case 'A':
                setSideA(sideA * -1.0)
                setSideA((sideA) => {
                    setAlgo(`${sideA}`)
                    return sideA
                })
                break;
            case 'B':
                setSideB(sideB * -1.0)
                setSideB((sideB) => {
                    setAlgo(`${sideB}`)
                    return sideB
                })
                break;
            case 'SUM':
                setSum(sum * -1.0)
                setSum((sum) => {
                    setAlgo(`${sum}`)
                    setSideA(sum)
                    return sum
                })
                break;
            default:
                break;
        }
    }

    const ToPercent = () => {
        switch (GetVarToWorkWith()) {
            case 'A':
                setSideA(sideA / 100.0)
                setSideA((sideA) => {
                    setAlgo(`${sideA}`)
                    return sideA
                })
                break;
            case 'B':
                setSideB(sideB / 100.0)
                setSideB((sideB) => {
                    setAlgo(`${sideB}`)
                    return sideB
                })
                break;
            case 'SUM':
                setSum(sum / 100)
                setSum((sum) => {
                    setAlgo(`${sum}`)
                    setSideA(sum)
                    return sum
                })
                break;
            default:
                break;
        }
    }

    const SetOperator = (opr) => {
        if(sideASet == false) {
            setSideASet(true)
            setOperator(opr)
            ResetAlgo()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.algoContainer}>
                <Text style={styles.algoText}>{algo}</Text>
            </View>
            <View style={styles.buttonContainer}>
                
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.numericButton} onPress={Clear}>
                        <Text style={[styles.numericButtonText, styles.numericButtonTextShrink]}>{clearAll ? 'AC' : 'C'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={ToggleSign}>
                        <Text style={styles.numericButtonText}>&plusmn;</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={ToPercent}>
                        <Text style={[styles.numericButtonText, styles.numericButtonTextShrink]}>%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={() => SetOperator('DIV')}>
                        <Text style={styles.numericButtonText}>&divide;</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.numericButton} onPress={() => AddToAlgo('7')}>
                        <Text style={styles.numericButtonText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={() => AddToAlgo('8')}>
                        <Text style={styles.numericButtonText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={() => AddToAlgo('9')}>
                        <Text style={styles.numericButtonText}>9</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={() => SetOperator('MUL')}>
                        <Text style={styles.numericButtonText}>&times;</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.numericButton} onPress={() => AddToAlgo('4')}>
                        <Text style={styles.numericButtonText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={() => AddToAlgo('5')}>
                        <Text style={styles.numericButtonText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={() => AddToAlgo('6')}>
                        <Text style={styles.numericButtonText}>6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={() => SetOperator('SUB')}>
                        <Text style={styles.numericButtonText}>-</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.numericButton} onPress={() => AddToAlgo('1')}>
                        <Text style={styles.numericButtonText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={() => AddToAlgo('2')}>
                        <Text style={styles.numericButtonText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={() => AddToAlgo('3')}>
                        <Text style={styles.numericButtonText}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={() => SetOperator('ADD')}>
                        <Text style={styles.numericButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.numericButton, styles.zeroButton]} onPress={() => AddToAlgo('0')}>
                        <Text style={styles.numericButtonText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={() => AddToAlgo('.')}>
                        <Text style={styles.numericButtonText}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numericButton} onPress={Calculate}>
                        <Text style={styles.numericButtonText}>=</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Colors.Background,
        width: '100%',
        padding: 10,
        paddingTop: STATUSBAR_HEIGHT
    },
    algoContainer: {
        width: '100%',
        backgroundColor: Colors.DarkField,
        borderRadius: 10,
        justifyContent: 'flex-end',
        flexGrow: 1,
        marginBottom: 10
    },
    algoText: {
        color: Colors.White,
        fontSize: 70,
        textAlign: 'right'
    },
    buttonContainer: {
        
    },
    numericButton: {
        width: 80,
        height: 80,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DarkField,
        borderRadius: 100
    },
    zeroButton: {
        width: 170,
        alignItems: 'flex-start',
        paddingLeft: 27,
    },
    numericButtonText: {
        color: Colors.White,
        textAlign: 'center',
        textAlignVertical: 'center',

        fontSize: 50
    },
    numericButtonTextShrink: {
        fontSize: 40
    },
    buttonRow: {
        flexDirection: 'row'
    },
})

export default Calculator;