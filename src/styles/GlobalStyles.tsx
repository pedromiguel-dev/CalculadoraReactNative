import {StyleSheet} from 'react-native';
import {myColors} from './colors';

export const btnBasicStyle = StyleSheet.create({
  btn: {
    width: 75,
    height: 75,
    borderRadius: 50,
    alignItens: 'center',
    justifyContent: 'center',
    // margin: 8,
  },
});

export const Colors = myColors;
export const Styles = StyleSheet.create({
  //keyboard
  row: {
    display: 'flex',
    maxWidth: '100%',
    flexDirection: 'row',
    gap: 15,
  },
  viewBottom: {
    gap: 15,
    alignItems: 'flex-end',
    bottom: 0,
    marginBottom: 15,
  },
  screenFirstNumber: {
    fontSize: 70,
    color: myColors.gray,
    fontWeight: '200',
    alignSelf: 'flex-end',
  },
  screenSecondNumber: {
    fontSize: 90,
    color: myColors.gray,
    fontWeight: '200',
    alignSelf: 'flex-end',
  },
  //btn
  btnBlue: {
    ...btnBasicStyle.btn,
    backgroundColor: myColors.blue,
  },
  btnDark: {
    ...btnBasicStyle.btn,
    backgroundColor: myColors.btnDark,
  },
  btnLight: {
    ...btnBasicStyle.btn,
    backgroundColor: myColors.white,
  },
  btnGray: {
    ...btnBasicStyle.btn,
    backgroundColor: myColors.btnGray,
  },
  btnBig: {
    width: '100%',
  },
  smallTextLight: {
    textAlign: 'center',
    fontSize: 32,
    color: myColors.white,
  },
  smallTextDark: {
    textAlign: 'center',
    fontSize: 32,
    color: myColors.black,
  },
});
