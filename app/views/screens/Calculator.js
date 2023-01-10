import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../config/Colors';

import {NativeModules} from 'react-native';
import NumericButton from '../components/NumericButton';
import OperatorButton from '../components/OperatorButton';
import FunctionButton from '../components/FunctionButton';
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

    const AppendAlgo = (char) => {
        if(algo === '0' && char === '0') { return }

        if(algo === '0') {
            setAlgo(char)
        } else {
            setAlgo(algo+char)
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
        if(opr === 'SUM') {
            Calculate()
            return
        }
        
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
                
                <FunctionButton value={clearAll ? 'AC' : 'C'} shrinkFont={true} onPress={Clear} />
                <FunctionButton value={'±'} onPress={ToggleSign} />
                <FunctionButton value={'%'} shrinkFont={true} onPress={ToPercent} />
                <OperatorButton operator={'DIV'} onPress={SetOperator} />

                <NumericButton value={7} appendNumber={AppendAlgo} />
                <NumericButton value={8} appendNumber={AppendAlgo} />
                <NumericButton value={9} appendNumber={AppendAlgo} />
                <OperatorButton operator={'MUL'} onPress={SetOperator} />

                <NumericButton value={4} appendNumber={AppendAlgo} />
                <NumericButton value={5} appendNumber={AppendAlgo} />
                <NumericButton value={6} appendNumber={AppendAlgo} />
                <OperatorButton operator={'SUB'} onPress={SetOperator} />


                <NumericButton value={1} appendNumber={AppendAlgo} />
                <NumericButton value={2} appendNumber={AppendAlgo} />
                <NumericButton value={3} appendNumber={AppendAlgo} />
                <OperatorButton operator={'ADD'} onPress={SetOperator} />

                <NumericButton value={0} appendNumber={AppendAlgo} />
                <NumericButton value={'.'} appendNumber={AppendAlgo} />
                <OperatorButton operator={'SUM'} onPress={SetOperator} />

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
        padding: 5,
        paddingTop: STATUSBAR_HEIGHT
    },
    algoContainer: {
        width: '95%',
        minHeight: 170,
        backgroundColor: Colors.DarkField,
        borderRadius: 10,
        justifyContent: 'flex-end',
        flexShrink: 1,
        margin: 10,
        paddingHorizontal: 10,
        overflow: 'hidden'
    },
    algoText: {
        color: Colors.White,
        fontSize: 70,
        textAlign: 'right'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
})

export default Calculator;