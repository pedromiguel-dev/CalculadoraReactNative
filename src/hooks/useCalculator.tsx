import React from 'react';
type ObjetoOp = {[key: string]: (a: number, b: number) => number};
const operationTable: ObjetoOp = {
  '+': (a, b) => a + b,
  '—': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  // '%': (a, b) => a * b,
};

export default function useCalculator(operationString: Array<string>) {
  let errorHandler = '';
  let final: number;
  console.log({operationString});

  function reducer(
    acc: number,
    current: string,
    index: number,
    array: Array<string>,
  ) {
    let returns: number = acc;

    if (parseFloat(current) && index == 0) {
      returns = parseFloat(current);
      return returns;
    }
    if (!parseFloat(current)) {
      if (operationTable.hasOwnProperty(current)) {
        returns = operationTable[current](acc, parseFloat(array[index + 1]));
      } else {
        errorHandler = current;
      }
      return returns;
    }
    return returns;
  }

  final = operationString.reduce(reducer, 0);
  console.log({final, type: typeof final});
  return parseFloat(final.toFixed(8)) || errorHandler;
}
