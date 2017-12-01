import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 16,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  btn: {
    backgroundColor: '#5db2ea',
    padding: 10
  },
  label: {
    fontSize: 16
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});