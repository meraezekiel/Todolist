import React, { useEffect } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
 
var db = openDatabase({ name: 'louie.db' });

const ViewScreen = ({ navigation }) => {};

export default ViewScreen;