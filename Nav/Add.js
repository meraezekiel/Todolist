import React, { useState } from 'react';
import { View,StyleSheet, Alert,ScrollView,KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CheckBox from '@react-native-community/checkbox';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'louieDatabase2.db' });



const COLORS = {primary: '#1f145c', white: '#fff', sblack:"#4D4C4C", black:'#000000',orange:'#FDBF1B',};


const AddScreen = ({ navigation }) => {
  let [taskTitle, setTaskTitle] = useState('');
  let [taskDesc, setTaskDesc] = useState('');
  let [taskCategory, setTaskCategory] = useState('');
  
  //const [isSelected, setSelection] = useState(false);

  
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
        'INSERT INTO louie2(task_title, task_desc, task_category)VALUES (?,?,?)',
        [taskTitle, taskDesc,taskCategory],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log("Added");
            console.log(taskCategory);
           
         
          } 
        }
      );
     returnes();
    });
  };
 
        return(
            <SafeAreaView style={{ flex: 1, padding:20 }}>
            <View style={{flex: 1}}>
              <View style={{ flex: 1 }}>
                <ScrollView keyboardShouldPersistTaps= "handled">
                  <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, justifyContent: 'space-between' }}>
                      
                      <TouchableOpacity onPress ={()=>returnes()}>
                      <View style={{marginBottom:100, flex:1, marginLeft:'80%',marginTop:'10%'}}>
                      <FontAwesome5 name= "times-circle" size={40} color= {COLORS.sblack}></FontAwesome5>
                      </View>
                      </TouchableOpacity>
                    {/* <MybuttonSave title="Save" customClick={adding_task} /> */}
                    
                    <View style ={{borderWidth:0.2, borderColor:COLORS.sblack, borderRadius:15, marginTop: 10}}>
                    <TextInput
                      placeholderTextColor={COLORS.sblack}
                      placeholder="Title"
                      onChangeText={
                        (taskTitle) => setTaskTitle(taskTitle)
                      }
                      style={{ padding: 20 ,color:COLORS.black , fontSize:25 }}
                    />
                    </View>
                    
                    <View style ={{borderWidth:0.2, borderColor:COLORS.sblack, borderRadius:15, marginTop: 10, height:300}}>
                    <TextInput
                      placeholderTextColor={COLORS.sblack}
                      placeholder="Start typing..."
                      onChangeText={
                        (taskDesc) => setTaskDesc(taskDesc)
                      
                      }
                     
                      maxLength={1000}
                      numberOfLines={5}
                      multiline={true}
                      style={{ textAlignVertical: 'top', padding: 20 , color:COLORS.black , fontSize:15,}}
                    />
                   </View>

                   {/* <View style={styles.container}>
                    <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={isSelected}
                      onValueChange={setSelection}
                      style={styles.checkbox}
                    />

                    <TextInput style={styles.label}
                      onValueChange={
                      (taskCategory) => setTaskCategory(taskCategory)}
                     
                    >{isSelected ? "Business" : "Personal"}</TextInput>
                    </View>
                    </View> */}



                   <TouchableOpacity onPress ={()=>adding_task()}>
                     
                      {/*save*/}  
                      <View style = {styles.save}>
                        <Text style={{color:COLORS.white, fontSize:'bold',fontSize:15}}>NewTask</Text>
                        <FontAwesome5 name = "angle-up" color={COLORS.white}
                          style={{marginLeft:10}} ></FontAwesome5>
                      </View>
                      {/*end save*/}  
                     
                    </TouchableOpacity>
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
        );
};

const styles = StyleSheet.create({
  save:{
    height:50,
    width:150,
    borderRadius:50,
    
    justifyContent:'center',
    alignItems: 'center',
    marginLeft:'50%',
    marginTop:'10%',
    flexDirection:'row',
    backgroundColor:COLORS.orange
  },
  container: {
    width:'40%',
    alignItems: "center",
    justifyContent: "center",
    borderRadius : 20,
    marginTop: 5,
    borderColor:COLORS.black,
    borderWidth:0.2
    
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    
  },
  checkbox: {
    alignSelf: 'center',
    marginTop : 20

    
    
    
  },
  label: {
    margin: 8,
    color:COLORS.black,
    fontSize:20,
    marginTop : 27

  },

});

export default AddScreen;