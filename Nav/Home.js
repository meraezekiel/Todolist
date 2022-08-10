import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView,StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import CheckBox from '@react-native-community/checkbox';
var db = openDatabase({ name: 'louieDatabase2.db' });

 
const COLORS = 
{primary: '#1f145c', white: '#fff', black:'#000000', lblack:'#888583', orange:'#FDBF1B',
swhite: '#BDBDB0'};

const HomeScreen = ({ navigation }) => {

  let [todos, setTodos] = useState([]);
  let [search,setSearch] = useState([]);
  let [filteredDataSource,setFilteredDataSource] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM louie2',
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
        "SELECT name FROM sqlite_master WHERE type='table' AND name='louie2'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS louie2', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS louie2(louie_id INTEGER PRIMARY KEY AUTOINCREMENT, task_title VARCHAR(20),  task_desc VARCHAR(1000), task_category VARCHAR(50))',
              []
            );
          }
        }
      );
    });
  }, []);


  
const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
   
    const newData = setTodos.filter(
      function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.task_title
            ? item.task_title.toUpperCase()
            : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      }
    );
    setFilteredDataSource(newData);
    
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(setTodos);
    
  }
  setSearch(text);
};

  return (
    <SafeAreaView style={styles.safe}>
        <View style = {styles.iconheader}>
            <FontAwesome5 name= "bars" size = {25} color = {COLORS.black}></FontAwesome5>
            <View style = {{flexDirection:'row'}}>

            <TextInput onChangeText={(search) => setFilteredDataSource(search)}
            
            placeholder='Search Here' 
            style = {{width:190, height:50 ,color:COLORS.black,borderWidth:0.2
            ,marginRight:30, borderRadius:10, padding:10,}}></TextInput>


              <View style = {{marginRight:20}}>
                <TouchableOpacity onPress={()=>searchFilterFunction()}>
            <FontAwesome5 name= "search" size = {25} color = {COLORS.black}></FontAwesome5>
            </TouchableOpacity>
            </View>
            <FontAwesome5 name= "bell" size = {25} color = {COLORS.black}></FontAwesome5>
            </View>
            

        </View>
        <View style = {styles.header}>
        <Text style = {styles.watsup}>
          Hey, What's up!
        </Text>
        </View>

       { /*/////////////////////categories//////////////////*/}
       

       { /*//////////////////////end of categories/////////////*/ }

       { /*//////////////////////today's  task/////////////*/ }    
          <View style = {{marginLeft:20, marginTop: 10}}>
            <Text style = {{color:COLORS.lblack, fontWeight:'bold'}}>TODAY'S TASK</Text>
          </View>
      { /*//////////////////////end today's  task/////////////*/ }    
      
        <FlatList
          
          showsVerticalScrollIndicator = {false}
          contentContainerStyle={{padding:20, paddingBottom:100}}
          data={todos}
          renderItem = {({item})=>(
          <TouchableOpacity 
           onPress={()=>navigation.navigate('EditScreen',item)}>
           
          <ListItem todo = {item}>
          </ListItem>
          </TouchableOpacity> )}>
          </FlatList> 

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
          {todo?.task_title}
          {todo?.task_category}
       </Text>   
       <Text style={styles.viewing1} >
          {todo?.task_desc}
       </Text>  
      </View>
  </View>
  
  
  );
};


const styles = StyleSheet.create({

  check:{
    backgroundColor:COLORS.lblack,

  },
 categories1:{
  elevation:10, 
  height: 110 , 
  width: '45%', 
  backgroundColor: COLORS.white,
  borderRadius: 15,
  justifyContent: 'center',
  marginTop: 10

 },
 categories2:{
  elevation:10, 
  height: 110 , 
  width: '48%', 
  backgroundColor: COLORS.white,
  borderRadius: 15,
  
  justifyContent: 'center',
  marginTop: 10,
  marginRight:18

 },
 
  safe:{
    flex:1,
    backgroundColor: COLORS.white,
    padding:5
  } ,
  header:{
    padding: 20,
    flexDirection: 'column',
    alignItems:'baseline',
    justifyContent:'space-between',
    
  },

  listItem:{
    marginTop:5,
    padding:20,
    backgroundColor:COLORS.white,
    flexDirection:'row',
    elevation:5,
    borderRadius:7,

   
    
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
iconheader:{
  flexDirection:'row',
  justifyContent:'space-between',
  padding: 20,
  backgroundColor:COLORS.orange

},

viewing:{
  color:COLORS.black,
  fontWeight:'bold',
  flexDirection: 'row',
  justifyContent:'space-between',
  fontSize:18,
  fontFamily:'sans-serif-medium',
  
  
},
watsup:{
  color:COLORS.black,
  fontWeight:'bold',
  fontSize:40,
  fontFamily:'sans-serif',
  
  
},
viewing1:{
  color:COLORS.lblack,
  fontWeight:'bold',
  flexDirection: 'row',
  justifyContent:'space-between',
  fontSize:10

},

});

 
export default HomeScreen;