import React, {useRef, useState} from 'react';
import Button from './Button';
import {View, Text, ScrollView, Animated} from 'react-native';
import {Styles} from '../styles/GlobalStyles';
import {myColors} from '../styles/colors';
import useCalculator from '../hooks/useCalculator';

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = React.useState('');
  const [percentageNumber, setPercentageNumber] = React.useState(1);

  const [result, setResult] = React.useState<Number | null>(null);
  const [operationString, setOperationString] = React.useState<String>('');
  const [cosmeticString, setCosmeticString] = React.useState<String>('');

  const resultHeight = useRef(new Animated.Value(0)).current; //used for animation of result
  const scale = useRef(new Animated.Value(0)).current; //used for animation of result

  React.useEffect(() => {
    let operation = operationString.split(';');
    let rex = /\S/;
    operation = operation.filter(rex.test.bind(rex));

    if (operation[operation.length - 1] == '!@') {
      let resultado = getResult();
      setFirstNumber(resultado.toString());
      setCosmeticString(resultado.toString());
      setOperationString(resultado.toString());
      return;
    }
  }, [operationString]);

  React.useEffect(() => {
    console.log('------------------------------------------------------');
    console.log({operationString});
    console.log({cosmeticString});
    console.log({firstNumber});
    console.log({percentageNumber});
    console.log({result});
  }, [operationString, cosmeticString, firstNumber]);

  React.useEffect(() => {
    if (result == null) {
      Animated.timing(resultHeight, {
        toValue: 0,
        useNativeDriver: false,
      }).start();

      Animated.timing(scale, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      return;
    }
    Animated.timing(resultHeight, {
      toValue: 120,
      useNativeDriver: false,
    }).start();
    Animated.timing(scale, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }, [result]);

  const handleNumberPress = (buttonValue: string) => {
    setFirstNumber(firstNumber + buttonValue);
    setCosmeticString(cosmeticString + buttonValue);
  };

  type ObjetoOp = {[key: string]: () => boolean};
  const operationTable: ObjetoOp = {
    '=': () => {
      setOperationString(operationString + ';' + firstNumber + ';!@');
      return true;
    },
    '+/-': () => {
      let NegativeNumber = parseFloat(firstNumber) * -1;
      setFirstNumber(NegativeNumber.toString());
      setCosmeticString(
        cosmeticString.slice(0, -firstNumber.length) +
          `(${NegativeNumber.toString()})`,
      );
      return true;
    },
    '%': () => {
      let operation = operationString.split(';');
      let rex = /\S/;
      operation = operation.filter(rex.test.bind(rex));

      let NegativeNumber = (parseFloat(firstNumber) / 100) * percentageNumber;
      setFirstNumber(NegativeNumber.toPrecision(5).toString());
      setCosmeticString(
        cosmeticString.slice(0, -firstNumber.length) +
          `(${NegativeNumber.toString()})`,
      );
      return true;
    },
  };

  const handleOperationButton = (buttonValue: string) => {
    if (operationTable[buttonValue]) {
      operationTable[buttonValue]();
      return;
    }
    setOperationString(operationString + ';' + firstNumber + ';' + buttonValue);
    setCosmeticString(cosmeticString + buttonValue);
    setPercentageNumber(parseFloat(firstNumber));
    setFirstNumber('');
  };
  const clear = () => {
    setOperationString('');
    setCosmeticString('');
    setFirstNumber('');
    setPercentageNumber(1);
    setResult(null);
  };

  const getResult = (): Number => {
    let errorHandler = '';
    let mathoperation = operationString.split(';');
    let rex = /\S/;
    let final = 0;
    mathoperation = mathoperation.filter(rex.test.bind(rex));

    let result = useCalculator(mathoperation);

    if (typeof result == 'string') {
      console.log({result, type: typeof final});
      setCosmeticString(`Erro ${errorHandler} unknown`);
      return 0;
    }
    setResult(result);
    return result;
  };

  const displayingNumber = () => {
    if (cosmeticString === '') {
      return <Text style={Styles.screenFirstNumber}>{'0'}</Text>;
    }
    if (cosmeticString.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{cosmeticString}</Text>;
    }
    if (cosmeticString.length > 5 && cosmeticString.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, {fontSize: 40}]}>
          {cosmeticString}
        </Text>
      );
    }
    if (cosmeticString.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, {fontSize: 50}]}>
          {cosmeticString}
        </Text>
      );
    }
  };
  const displayingResult = () => {
    function stylesResult() {
      if (result && result.toString().length > 5) {
        return [
          Styles.screenSecondNumber,
          {fontSize: 50, color: myColors.result},
        ];
      }
      return [Styles.screenSecondNumber, {color: myColors.result}];
    }
    return <Text style={stylesResult()}>{result && result.toString()}</Text>;
  };

  return (
    <View style={Styles.viewBottom}>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={Styles.screenSecondNumber}>{displayingNumber()}</Text>
        <Animated.View
          style={[
            {
              height: 120,
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
            {height: resultHeight, transform: [{scale}]},
          ]}>
          {displayingResult()}
        </Animated.View>
      </View>
      <View style={Styles.row}>
        <Button isGray title="C" onPress={() => clear()} />
        <Button
          isGray
          title="+/-"
          onPress={() => handleOperationButton('+/-')}
        />
        <Button isGray title="%" onPress={() => handleOperationButton('%')} />
        <Button isBlue title="/" onPress={() => handleOperationButton('/')} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress('7')} />
        <Button title="8" onPress={() => handleNumberPress('8')} />
        <Button title="9" onPress={() => handleNumberPress('9')} />
        <Button isBlue title="*" onPress={() => handleOperationButton('*')} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress('4')} />
        <Button title="5" onPress={() => handleNumberPress('5')} />
        <Button title="6" onPress={() => handleNumberPress('6')} />
        <Button isBlue title="—" onPress={() => handleOperationButton('—')} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress('1')} />
        <Button title="2" onPress={() => handleNumberPress('2')} />
        <Button title="3" onPress={() => handleNumberPress('3')} />
        <Button isBlue title="+" onPress={() => handleOperationButton('+')} />
      </View>
      <View style={Styles.row}>
        <Button title="0" isBig onPress={() => handleNumberPress('0')} />
        <Button title="." onPress={() => handleNumberPress('.')} />
        {/* <Button title="⌫" onPress={() => handleOperationButton('⌫')} /> */}
        <Button isBlue title="=" onPress={() => handleOperationButton('=')} />
      </View>
    </View>
  );
}
