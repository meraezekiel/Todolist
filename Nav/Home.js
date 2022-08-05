import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView,StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
var db = openDatabase({ name: 'louieDatabase.db' });
 
const COLORS = {primary: '#1f145c', white: '#fff', black:'#000000', lblack:'#383C39', orange:'#FDBF1B',
swhite: '#BDBDB0'};
const HomeScreen = ({ navigation }) => {
  let [todos, setTodos] = useState({});

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM louie',
      [],
      (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setTodos(temp);
      });
    });
  }, []);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='louie'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS louie', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS louie(louie_id INTEGER PRIMARY KEY AUTOINCREMENT, task_title VARCHAR(20),  task_desc VARCHAR(1000))',
              []
            );
          }
        }
      );
    });
  }, []);
//console.log (Delete);
const confirmDelete =()=>{
    Alert.alert("Confirm","Do you want to Delete All", [{
      text:"Yes",
      onPress:()=>Delete(),

    },{text:"No"}
  
  ])

};
  const Delete=()=>{
      db.transaction(function (tx) {
      tx.executeSql(
        
        'DELETE FROM louie'
       
      );
      console.log("Successfully Deleted");
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      
    })
    
    });

  };
const trylng=()=>{

  Alert.alert('Try','long press ni boy!');
  console.log ('');
};
  return (
    <SafeAreaView style={styles.safe}>
        <View style = {styles.header}>
        <Text style = {{fontWeight:'bold', fontSize:20, color:COLORS.white}}>
          TO DO LIST APPLICATION
        </Text>
        <TouchableOpacity onPress={()=>confirmDelete()}>
          <FontAwesome5 name= 'trash' size = {20}/>
        </TouchableOpacity>
        
        </View>
        <FlatList
          showsVerticalScrollIndicator = {false}
          contentContainerStyle={{padding:20, paddingBottom:100}}
          data={todos} renderItem = {({item})=>(
          <TouchableOpacity 
          onPress={()=>navigation.navigate('EditScreen',item)}
          onLongPress={()=>trylng(item)}>
          <ListItem todo = {item}></ListItem>
          </TouchableOpacity> )}></FlatList>

          
          <TouchableOpacity>
          <View style = {styles.iconContainer}>
            <FontAwesome5 name="plus" size={30} onPress = {()=>navigation.navigate('AddScreen')}></FontAwesome5>
          </View>
        </TouchableOpacity>
         
    </SafeAreaView>
  );
};

const ListItem = ({todo}) =>{
  
  return (
     <View style = {styles.listItem}>
      <View style={{ flexDirection: 'column'}}>
        <Text style={styles.viewing} >
          {todo?.task_title }
       </Text>    
       <Text style={styles.viewing1} >
          {todo?.task_desc}
       </Text>  
      </View>
  </View>
  
  
  );
};

const styles = StyleSheet.create({
  safe:{
    flex:1,
    backgroundColor: COLORS.black,
  } ,
  header:{
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },

  listItem:{
    padding:20,
    backgroundColor:COLORS.lblack,
    flexDirection:'row',
    elevation:5,
    borderRadius:7,
    marginVertical:10,
    
},
iconContainer:{
  height:50,
  width:50,
  backgroundColor:COLORS.orange,
  borderRadius:25,
  elevation:40,
  justifyContent:'center',
  alignItems: 'center',
  marginLeft:'75%',
  marginBottom:'10%'
},

viewing:{
  color:COLORS.white,
  fontWeight:'bold',
  flexDirection: 'row',
  justifyContent:'space-between',
  fontSize:18
},
viewing1:{
  color:COLORS.swhite,
  fontWeight:'bold',
  flexDirection: 'row',
  justifyContent:'space-between',
  fontSize:10

}
});

 
export default HomeScreen;