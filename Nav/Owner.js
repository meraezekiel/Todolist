import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView,StyleSheet, FlatList, TouchableOpacity, Alert ,Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
//import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

var db = openDatabase({ name: 'louieDatabase1.db' });
 
const COLORS = {primary: '#1f145c', white: '#fff', black:'#000000', lblack:'#383C39', orange:'#FDBF1B',
swhite: '#BDBDB0'};

const OwnerScreen = (navigation) => {
      
    let [todos, setTodos] = useState([]);
    let [ownerName, setOwnersName] = useState();
    
   

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM louie1',
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
          "SELECT name FROM sqlite_master WHERE type='table' AND name='louie1'",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS louie1', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS louie1(louie_id INTEGER PRIMARY KEY AUTOINCREMENT, task_title VARCHAR(20),  task_desc VARCHAR(1000), owner_name VARCHAR(100) )',
                []
              );
            }
          }
        );
      });
    }, []);

    

    let adding_owner = () => {
     
         if (!ownerName) {
             Alert.alert ("Error","Please fill out empty fields");
           return;
         }
         
         db.transaction(function (tx) {
           tx.executeSql(
             'INSERT INTO louie1(owner_name)VALUES (?)',
             [ownerName],
             (tx, results) => {
               console.log('Results', results.rowsAffected);
               if (results.rowsAffected > 0) {
                 console.log("Added");
              
               } 
             }
           );
          //returnes();
         });
       };
    
       const Delete=()=>{
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM louie1',
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
            routes: [{ name: 'OwnerScreen' }],
        })
        });
  
    };
  

  return (
    <SafeAreaView>
        <View>
            <View style = {styles.lawaslawas}>
            <Image 
            source={require('./myicon/todo.png')} 
            style = {{width:100, height: 200}}
            resizeMode ='contain'
            />
                <Text style = {{color:COLORS.black, fontWeight:'bold',fontSize : 30}}>
                    Register you name 
                </Text>
                <View style ={styles.inputContainer}>
                <TextInput 
                placeholder = 'Start typing here...' 
                placeholderTextColor={COLORS.lblack}
                onChangeText={
                    (ownerName) => setOwnersName(ownerName)
                  }
                style = {{color:COLORS.black , fontSize:20 }}>
                </TextInput>
                </View>
                <TouchableOpacity  onPress ={()=>Delete()}>
                    <View style ={styles.regbtn}>
                        <Text style = {{color:COLORS.black, fontWeight:'bold',fontSize : 20}}>
                            Register
                        </Text>
                    </View>

                </TouchableOpacity>
                <FlatList
                showsVerticalScrollIndicator = {false}
                contentContainerStyle={{padding:20, paddingBottom:100}}
                data={todos} renderItem = {({item})=>(<ListItem todo = {item}></ListItem>)}>

                </FlatList>

            </View>

            
         </View>

    </SafeAreaView>
  );

  
};

const ListItem = ({todo}) =>{
  
    return (
       <View style = {styles.listItem}>
        <View style={{ flexDirection: 'column'}}>
          <Text style={styles.viewing} >
            {todo?.owner_name }
         </Text>     
        </View>
    </View>
    
    
    );
  };

const styles = StyleSheet.create({
  lawaslawas:{
    height:'90%',
    elevation: 40,
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'column',

  },
  viewing:{
    color:COLORS.black,
    fontWeight:'bold',
    flexDirection: 'row',
    justifyContent:'space-between',
    fontSize:18
  },
  inputContainer:{
    marginTop : 50,
    width :'80%',
    borderWidth:.2,
    borderRadius: 10,
    alignItems: 'center'

  },
  regbtn:{
        marginTop: 20,
        backgroundColor : COLORS.orange,
        width:100,
        alignItems:'center',
        justifyContent:'center',
        height:50,
        width:200,
        borderRadius:10,
        elevation:20,

  }

});

 
export default OwnerScreen;