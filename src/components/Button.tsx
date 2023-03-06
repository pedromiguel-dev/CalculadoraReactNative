import {useContext} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {btnBasicStyle, Styles} from '../styles/GlobalStyles';

interface ButtonProps {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
  isBig?: boolean;
}

function setButtonColor(
  theme: string,
  isBlue: boolean,
  isGray: boolean,
  isBig: boolean,
) {
  if (isBlue == isGray) {
    switch (theme) {
      case 'light':
        return Styles.btnLight;
        break;
      default:
        return Styles.btnDark;
        break;
    }
  }
  if (isBlue) {
    return Styles.btnBlue;
  } else {
    return Styles.btnGray;
  }
}

function setTextColor(theme: string, isBlue: boolean, isGray: boolean) {
  if (isBlue || isGray) {
    return Styles.smallTextLight;
  }
  switch (theme) {
    case 'light':
      return Styles.smallTextDark;
      break;
    default:
      return Styles.smallTextLight;
      break;
  }
}

export default function Button({
  title,
  onPress,
  isBlue = false,
  isGray = false,
  isBig = false,
}: ButtonProps) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[
        setButtonColor(theme, isBlue, isGray, isBig),
        isBig ? {width: btnBasicStyle.btn.width * 2 + 10} : {},
      ]}
      onPress={onPress}>
      <Text style={setTextColor(theme, isBlue, isGray)}>{title}</Text>
    </TouchableOpacity>
  );
}
