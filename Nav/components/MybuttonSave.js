import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
 
const COLORS = {primary: '#1f145c', white: '#fff'};
const Mybutton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#B1F4C2',
    color: '#ffffff',
    padding: 10,
    justifyContent : 'center',
    marginTop: 16,
    marginLeft: '70%',
    marginRight: 35,
    height: 40,
    width:100,
    borderRadius: 10
    

  },
  text: {
    color: '#ffffff',
  },
  
});
 
export default Mybutton;