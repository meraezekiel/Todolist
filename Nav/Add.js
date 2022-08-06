import React, { useState } from 'react';
import { View,StyleSheet, Alert,ScrollView,KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { TextInput } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'louieDatabase.db' });



const COLORS = {primary: '#1f145c', white: '#fff', sblack:"#BBBBBB", black:'#000000'};


const AddScreen = ({ navigation }) => {
  let [taskTitle, setTaskTitle] = useState('');
  let [taskDesc, setTaskDesc] = useState('');
  
  const returnes =()=>{
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
  });
    
  }; 
  

  let adding_task = () => {
   // console.log(taskTitle, taskDesc);
    
   // let r = (Math.floor(100000 + Math.random() * 900000));
   // console.log(r);
 
    if (!taskTitle) {
        Alert.alert ("Error","Please fill out empty fields");
      return;
    }
    if (!taskDesc) {
        Alert.alert ("Error","Please fill out empty fields");
      return;
    }
    
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO louie(task_title, task_desc)VALUES (?,?)',
        [taskTitle, taskDesc],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log("Added");
         
          } 
        }
      );
     returnes();
    });
  };
 
        return(
            <SafeAreaView style={{ flex: 1,}}>
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

                      {/*save*/}  
                      <FontAwesome5 
                      name="check" 
                      size={20} 
                      color={COLORS.white} 
                      onPress ={()=>adding_task()}
                      ></FontAwesome5>
                      {/*end save*/}  

                      
                      </View>
                    </TouchableOpacity>

                    {/* <MybuttonSave title="Save" customClick={adding_task} /> */}
                    <TextInput
                      placeholder="Title"
                      onChangeText={
                        (taskTitle) => setTaskTitle(taskTitle)
                      }
                      style={{ padding: 20 ,color:COLORS.white , fontSize:25}}
                    />
                    
                    <TextInput
                      placeholder="Start typing..."
                      onChangeText={
                        (taskDesc) => setTaskDesc(taskDesc)
                      
                      }
                     
                      maxLength={1000}
                      numberOfLines={5}
                      multiline={true}
                      style={{ textAlignVertical: 'top', padding: 20 , color:COLORS.white , fontSize:15,}}
                    />
                   
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

export default AddScreen;