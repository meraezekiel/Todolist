import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'louieDatabase2.db' , createFromLocation: 1});


const COLORS = {primary: '#1f145c', white: '#fff', sblack:"#4D4C4C", black:'#000000',orange:'#FDBF1B'};
export default function EditScreen ({route ,navigation}){
    const {louie_id, task_title, task_desc, task_category} = route.params;
    const [state, setState] = React.useState({
      taskTitle:task_title,
      taskDesc:task_desc,
      taskCategory:task_category
  
    });
    const [isSelected, setSelection] = useState(false);
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
    
 
  let update = () => {
    console.log(state.taskTitle, state.taskDesc,state.taskCategory,);
  
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE louie2 set task_title=?, task_desc=?, task_category=? where louie_id =?',
        [state.taskTitle,state.taskDesc,state.taskCategory, louie_id],
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
    console.log(state.taskTitle, state.taskDesc,state.taskCategory);
  
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM louie2 where louie_id =?',
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
 


  return(
    <SafeAreaView style={{ flex: 1, padding:20 }}>
    <View style={{flex: 1}}>
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps= "handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
              <View style ={{flexDirection:'row', alignItems:'center',
               justifyContent:'space-between', marginBottom:50}}>
              <TouchableOpacity onPress ={()=>deleted()}>
              <View>
              <FontAwesome5 name= "trash" size={40} color= {COLORS.sblack}></FontAwesome5>
              </View>
              </TouchableOpacity>

              <TouchableOpacity onPress ={()=>returnes()}>
              <View>
              <FontAwesome5 name= "times-circle" size={40} color= {COLORS.sblack}></FontAwesome5>
              </View>
              </TouchableOpacity>
              </View>
            {/* <MybuttonSave title="Save" customClick={adding_task} /> */}
            
            <View style ={{borderWidth:0.2, borderColor:COLORS.sblack, borderRadius:15, marginTop: 10}}>
            <TextInput
              placeholderTextColor={COLORS.sblack}
              placeholder="Title"
              value={state.taskTitle}
              onChangeText={text => updateState('taskTitle',text)}
             
              style={{ padding: 20 ,color:COLORS.black , fontSize:25 }}
            />
            </View>
            
            <View style ={{borderWidth:0.2, borderColor:COLORS.sblack, borderRadius:15, marginTop: 10, height:300}}>
            <TextInput
              placeholderTextColor={COLORS.sblack}
              placeholder="Start typing..."
              value={state.taskDesc}
                    onChangeText={text => updateState('taskDesc',text)
              
              }
             
              maxLength={1000}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top', padding: 20 , color:COLORS.black , fontSize:15,}}
            />
           </View>
     
           <TouchableOpacity onPress ={()=>update()}>
             
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










{/*<TextInput
                      placeholderTextColor={COLORS.sblack}
                      value={state.taskTitle}
                      onChangeText={text => updateState('taskTitle',text)}
                      placeholder="Title"
                      style={{ padding: 20 ,color:COLORS.white , fontSize:25}}></TextInput> 
                    
                    
                    
 <TextInput
 placeholderTextColor={COLORS.sblack}
                    value={state.taskDesc}
                    onChangeText={text => updateState('taskDesc',text)}
                    placeholder="Desc"
                      maxLength={1000}
                      numberOfLines={5}
                      multiline={true}
                      style={{ textAlignVertical: 'top', padding: 20 , color:COLORS.white , fontSize:15}}></TextInput> 
                                        */}