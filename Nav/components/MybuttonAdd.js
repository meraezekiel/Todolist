import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
 
const COLORS = {primary: '#1f145c', white: '#fff'};
// const Mybutton = (props) => {
//   return (
//     <TouchableOpacity
//       style={styles.button}
//       onPress={props.customClick}>
//       <Text style={styles.text}>
//         {props.title}
//       </Text>
//     </TouchableOpacity>
//   );
// };
const MybuttonAdd = (props) => {
  return (
    <TouchableOpacity
      style={styles.buttonAdd}
      onPress={props.customClick}>
      <Text style={styles.textAdd}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  // button: {
  //   alignItems: 'center',
  //   backgroundColor: '#f05555',
  //   color: '#ffffff',
  //   padding: 10,
  //   marginTop: 16,
  //   marginLeft: 35,
  //   marginRight: 35,
  // },
  // text: {
  //   color: '#ffffff',
  // },
  buttonAdd: {
      height:50,
      width:50,
      backgroundColor:COLORS.primary,
      borderRadius:25,
      elevation:40,
      justifyContent:'center',
      alignItems: 'center',
      position:'absolute',
      bottom: 0,
      elevation: 40,
      marginLeft:'70%',
      marginBottom:30,
  },
  textAdd: {
    color: '#ffffff',
  },
});
 
export default MybuttonAdd;