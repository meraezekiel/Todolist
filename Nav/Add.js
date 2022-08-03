import React, { useEffect, useState } from 'react';
import { View,Text,StyleSheet, Alert,ScrollView,KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//import Mytextinput from './components/Mytextinput';
import MybuttonSave from './components/MybuttonSave';
import { TextInput } from 'react-native-gesture-handler';
//import MybuttonAdd from './components/MybuttonAdd';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'louieDatabase.db' });



const COLORS = {primary: '#1f145c', white: '#fff', sblack:"#BBBBBB"};
const AddScreen = ({ navigation }) => {
  let [taskTitle, setTaskTitle] = useState('');
  let [taskDesc, setTaskDesc] = useState('');
  
 
  let adding_task = () => {
    console.log(taskTitle, taskDesc);
    console.log(db);
 
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
        'INSERT INTO louie(task_title, task_desc) VALUES (?,?)',
        [taskTitle, taskDesc],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Successfully Added',
              
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Save Failed');
        }
      );
    });
  };
 
        return(
            <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1, backgroundColor: COLORS.sblack}}>
              <View style={{ flex: 1 }}>
                <ScrollView keyboardShouldPersistTaps= "handled">
                  <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, justifyContent: 'space-between' }}>
                    <MybuttonSave title="Save" customClick={adding_task} />
                    <TextInput
                      placeholder="Title"
                      onChangeText={
                        (taskTitle) => setTaskTitle(taskTitle)
                      }
                      style={{ padding: 10 ,color:COLORS.primary}}
                    />
                    
                    <TextInput
                      placeholder="Start typing..."
                      onChangeText={
                        (taskDesc) => setTaskDesc(taskDesc)
                      }
                      maxLength={1000}
                      numberOfLines={5}
                      multiline={true}
                      style={{ textAlignVertical: 'top', padding: 10 , color:COLORS.primary}}
                    />
                   
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
        );
};

const styles = StyleSheet.create({
   
})
export default AddScreen;