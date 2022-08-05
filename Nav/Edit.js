import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'louieDatabase.db' , createFromLocation: 1});


const COLORS = {primary: '#1f145c', white: '#fff', sblack:"#BBBBBB", black:'#000000'};
export default function EditScreen ({route ,navigation}){
    const {louie_id, task_title, task_desc} = route.params;
    const [state, setState] = React.useState({
      taskTitle:task_title,
      taskDesc:task_desc,
  
    });
    const returnes =()=>{
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
    });
      
    }; 
    const updateState = (key, value) => {
      setState(oldState => ({
        ...oldState,
        [key]: value,
      }));
    };
    
 

// useEffect(()=>{
//     console.log (louie_id);
//     db.transaction((tx) => {
//         tx.executeSql(
//           'SELECT * FROM louie where louie_id ='+{louie_id},
//           [louie_id,task_title,task_desc],
//           (tx, results) => {
//             var len = results.rows.length;
//             if (len > 0) {
//               let res = results.rows.item(0);
//               updateAllStates(res.louie_id, res.task_title, res.task_desc);
//             } else {
//               alert('No user found');
//               updateAllStates('', '', '');
//             }
//           },
//         );
//       });
// });

  let update = () => {
    console.log(state.taskTitle, state.taskDesc);
  
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE louie set task_title=?, task_desc=? where louie_id =?',
        [state.taskTitle,state.taskDesc, louie_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
              console.log("Updated")
          } else {
            console.log('failed');
          };
        },
      );
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
    })
    });
  };
 

  let deleted = () => {
    console.log(state.taskTitle, state.taskDesc);
  
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM louie where louie_id =?',
        [louie_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
              console.log("Deleted")
          } else {
            console.log('failed');
          };
        },
      );
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
    })
    });
  };
 


  return (
    <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1, backgroundColor: COLORS.black}}>
              <View style={{ flex: 1 }}>
                <ScrollView keyboardShouldPersistTaps= "handled">
                  <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, justifyContent: 'space-between' }}>
                      <TouchableOpacity>
                      <View style = {styles.save}>
                       {/*return*/}  
                       <FontAwesome5 
                      name="arrow-left" 
                      size={20} 
                      color={COLORS.white} 
                      onPress ={()=>returnes()}
                      ></FontAwesome5>
                      {/*end return*/}  
                  <View style={{flexDirection:'row'}}>
                    <View style={{marginRight:20}}>
                      {/*delete*/}  
                      <FontAwesome5 
                      name="trash" 
                      size={20} 
                      color={COLORS.white} 
                      onPress ={()=>deleted()}
                      ></FontAwesome5>
                      {/*end delete*/}
                      </View>
                      {/*save*/}  
                      <FontAwesome5 
                      name="check" 
                      size={20} 
                      color={COLORS.white} 
                      onPress ={()=>update()}
                      ></FontAwesome5>
                      {/*end save*/}  
                    </View>
                      
                      </View>
                    </TouchableOpacity>
                   
                    
                  <TextInput
                      value={state.taskTitle}
                      onChangeText={text => updateState('taskTitle',text)}
                      placeholder="Title"
                      style={{ padding: 20 ,color:COLORS.white , fontSize:25}}></TextInput> 

                    
                 <TextInput
                    value={state.taskDesc}
                    onChangeText={text => updateState('taskDesc',text)}
                    placeholder="Desc"
                      maxLength={1000}
                      numberOfLines={5}
                      multiline={true}
                      style={{ textAlignVertical: 'top', padding: 20 , color:COLORS.white , fontSize:15}}></TextInput> 
                     
                   
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  save:{
    flexDirection:'row',
    flex:1,
    marginTop:'3%',
    paddingLeft:20,
    width:'90%',
    alignItems: 'center',
    justifyContent:'space-between',
  }

});
 
