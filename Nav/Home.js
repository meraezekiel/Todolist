import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
//import Mybutton from './components/Mybutton';
import MybuttonAdd from './components/MybuttonAdd';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
 
var db = openDatabase({ name: 'louieDatabase.db' });
 
const HomeScreen = ({ navigation }) => {
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
 console.log(db);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Praktis lng" />
          <MybuttonAdd
            title="ADD"
            customClick={() => navigation.navigate('AddScreen')}
          />
          {/* <Mybutton
            title="Update"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="View All"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          /> */}
        </View>
     
      </View>
    </SafeAreaView>
  );
};

 
export default HomeScreen;