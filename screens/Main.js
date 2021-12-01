import React from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Pressable, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './LoginScreen';
import Signup from './Signup';
import ChangePW from './ChangePW';
import StackNavigator from '../App';
import Logout from "./Logout";
import DeleteAccountScreen from "./DeleteAccount";
import axios from "axios";

const DATA = [
    {
         id: '1',
         name: '수쟁이',
         img: require('../Source/person_activated.png'),
         member_type : 1
    },
    {
        id: '2',
        name: '으노',
        img: require('../Source/person_activated.png'), 
        member_type : 1
    },
    {
        id: '3',
        name: '초롱이',
        img: require('../Source/pet_activated.png'),
        member_type : 2
    },
    {
        id: '4',
        name: '횬',
        img: require('../Source/person_activated.png'),
        member_type : 1
      },
    {
        id: '5',
        name: '바질이',
        img: require('../Source/plant_activated.png'),
        member_type : 3
    },
    {
        id: '6',
        name: 'SJ',
        img: require('../Source/person_activated.png'), 
        member_type : 1
    },
  ];

  // 함수쓸거야
  /*
  const confirm = async() => {
      axios.post("http://35.212.138.86/login", {
        email : email,
        pw : pw
      })
      .then(function(배열) {
          // 실행 내용
          
      }).catch(function (error) {
          console.log("error");
      }).then(function() {
          console.log("^^");
      });
  }
  */

  // 여기까지
  
const Drawer = createDrawerNavigator();

const mainScreen = ({navigation}) => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen 
            name="MainListScreen" 
            component={MainListScreen}  
            options = {{headerShown : false}}
            />
            <Drawer.Screen name="ChangePassword" component={ChangePW} options={{drawerLabel :'비밀번호 변경',headerShown : false}}/>
            <Drawer.Screen name="Logout" component={Logout} options={{drawerLabel :'로그아웃',headerShown : false}}/>
            <Drawer.Screen name="DeleteAccount" component={DeleteAccountScreen} options={{drawerLabel :'계정삭제',headerShown : false}}/>
        </Drawer.Navigator>
    );
}

function MainListScreen({ navigation }) {
    const renderItem = ({ item }) => {return (
        <TouchableOpacity onPress={() => navigation.navigate('Spec')}>
            <View style={ styles.item}>
                <Image style={styles.itemImg} source={item.img} ></Image>
                <Text style={styles.itemName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );}
    return (
        <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.body}>
            <View style={styles.memberListbg}>
                <SafeAreaView style={{flex:9}}>
                    <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
                </SafeAreaView> 
                <View style={styles.pluscontainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Reg')}>
                        <Image style={styles.plusicon} source={require('../Source/plus.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
    );
  }
  

  

export default mainScreen;



const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    header : {
        flex : 1,
        flexDirection:"column",
        backgroundColor : 'white',
    },
    // logo_DANBI: {
    //     flex : 10,
    //     //backgroundColor: "green",
    //     resizeMode: "cover", 
    //     height: 130,
    //     alignContent : "center",
    //     justifyContent : "center"
    //   },
    logobg_My: {
        flex : 1,
        flexDirection : "row",
        //backgroundColor :"blue",
        alignSelf: "flex-end",
        //marginVertical : 10,
        //marginLeft :10,
        
      },
    logo_My: {
        flex : 1,
        //backgroundColor :"yellow",
        width : 47,
        height: 47,
        resizeMode: "contain",
        margin: 10,
        //marginLeft :330

      },
    body : {
        backgroundColor :"#FFFFFF",
        flex : 10,
        justifyContent : "center",
        alignItems: "center",
    },
    memberListbg :{
        flex:0.8,
        width: 300,
        height: 600,
        marginHorizontal: 30,
        padding: 10,
        borderWidth : 1,
        borderColor :"black",
        backgroundColor: "#DEEFFF",
        borderRadius: 10,
    },
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 10,
        flexDirection:'row'
    },
    itemImg :{
        //backgroundColor: "red",
        width:50,
        height:50,
        marginRight:10,
        resizeMode: "contain",
    },
    itemName :{
        //backgroundColor :"blue",
        fontSize:20,
        fontWeight: "300",
        justifyContent :"center",
        marginTop:15,
        marginHorizontal:10,
    },
    pluscontainer:{
        flex:1,
        backgroundColor:"#DEEFFF",
        height:40,
        justifyContent:"center",
        alignItems:"center",
        paddingTop : 10
    },
    plusicon:{
        height:30,
        width:30,
        resizeMode: "contain",
    },
});