import React, { useState, Component } from "react";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import {sendInfo, currentID} from './Main.js'
import axios from 'axios';
import { 
  ImageBackground,
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

Date.prototype.format = function(f) {
  if(!this.valueOf()) return " ";

  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
    switch ($1) {
        case "yyyy": return d.getFullYear();
        case "yy": return (d.getFullYear() % 1000).zf(2);
        case "MM": return (d.getMonth() + 1).zf(2);
        case "dd": return d.getDate().zf(2);
        case "E": return weekName[d.getDay()];
        case "HH": return d.getHours().zf(2);
        case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
        case "mm": return d.getMinutes().zf(2);
        case "ss": return d.getSeconds().zf(2);
        case "a/p": return d.getHours() < 12 ? "AM" : "PM";
        default: return $1;
    }
  });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

function Edit_plant() {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [time_text, setTime_text] = useState("");

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSupplyTime(date);
    hideTimePicker();
    setTime_text(date.format("a/p hh:mm"));
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date_text, setDate_text] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm_date = (date) => {
    setSupplyDate(date);
    hideDatePicker();
    setDate_text(date.format("yyyy/MM/dd"))
  };

  const [text_cycle, setText_cycle] = useState("");

  const [nickname, setNickname] = useState("");
  const [type, setType] = useState("");
  const [supplyDate, setSupplyDate] = useState(null);
  const [supplyTime, setSupplyTime] = useState(null);
  const [amountInput, setAmountInput] = useState("");

  const editPlant = () => {
      axios.post("http://35.212.138.86/member/editmemberinfo", {
        nickname : nickname,
        supply_time : supplyTime,
        intake_goal : amountInput,
        last_supply_date : supplyDate,
        supply_time : supplyTime,
        cycle : text_cycle
      }).then(function(response) {
        navigation.goBack();
      }).catch(function (error) {
      }).then(function() {
      });
  }


  return (
    
    <ImageBackground source = {require('../Source/reg_background.png')} style = {styles.backgroundimage}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.list}>
                    <View style={styles.eachLine}>
                        <View style={styles.inputTag}>
                        <Text style={styles.contentText}>?????????</Text>
                        </View>
                        <TextInput 
                        onChangeText={setNickname}
                        value={nickname}
                        style={styles.inputField}
                        placeholder = "Nickname"
                        placeholderTextColor = "gray"/>
                    </View>
                    <View style={styles.eachLine}>
                        <View style={styles.inputTag}>
                        <Text style={styles.contentText}>?????? ??????</Text>
                        </View>
                        <TouchableOpacity
                        style={styles.inputField}>
                            <RNPickerSelect
                            placeholder={{
                                label:"Plant Type",
                                color : "gray"
                            }}
                            value={type}
                            onValueChange={(value)=>setType(value)}
                            items={[
                                {label : '???????????? ???????????????', value : '???????????? ???????????????'},
                                {label : '???????????????', value : '???????????????'},
                                {label : '???????????? ????????????', value : '???????????? ????????????'},
                                {label : '???????????? ?????????', value : '???????????? ?????????'},
                                {label : '????????? ?????????', value : '????????? ?????????'},
                                {label : '???????????? ?????? ???????????????', value : '???????????? ?????? ???????????????'},
                                {label : '????????????', value : '????????????'},
                                {label : '??????????????? ?????????', value : '??????????????? ?????????'},
                                {label : '?????????', value : '?????????'},
                                {label : '????????? ??????', value : '????????? ??????'},
                                {label : '??????', value : '??????'},
                            ]}/>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={styles.eachLine}>
                        <View style={styles.inputTag}>
                        <Text style={styles.contentText}>????????? ?????????</Text>
                        </View>

                        <TouchableOpacity onPress={showDatePicker} style={styles.inputField}>
                          <TextInput
                          pointerEvent="none"
                          placeholder="Last Water Supply Date"
                          placeholderTextColor="gray"
                          editable={false}
                          value={date_text}
                          />
                          <DateTimePickerModal
                          headerTextIOS = "Last Water Supply Date"
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={handleConfirm_date}
                          onCancel={hideDatePicker}
                          />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachLine}>
                        <View style={styles.inputTag}>
                        <Text style={styles.contentText}>?????? ??????</Text>
                        </View>
                        <TouchableOpacity onPress={showTimePicker} style={styles.inputField}>
                        <TextInput
                        pointerEvent="none"
                        placeholder="Water Supply Time"
                        placeholderTextColor="gray"
                        editable={false}
                        value={time_text}
                        />
                        <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirm}
                        onCancel={hideTimePicker}
                        minuteInterval={10}
                        />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachLine}>
                        <View style={styles.inputTag}>
                        <Text style={styles.contentText}>?????????</Text>
                        </View>
                        <View style={styles.inputField} flexDirection="row" justifyContent="space-between" alignItems="center">
                            <TextInput 
                           onChangeText={setAmountInput}
                           value={amountInput}
                           placeholder = "Water Supply Amount"
                           placeholderTextColor = "gray"
                           keyboardType="number-pad"/>
                            <Text>mL</Text>
                        </View>
                    </View>
                    <View style={styles.eachLine}>
                        <View style={styles.inputTag}>
                        <Text style={styles.contentText}>?????? ??????</Text>
                        </View>
                        <TouchableOpacity
                        style={styles.inputField}>
                            <RNPickerSelect
                            placeholder={{
                                label:"Water Supply Cycle",
                                color : "gray",
                            }}
                            value={text_cycle}
                            onValueChange={(value)=>setText_cycle(value)}
                            items={[
                                {label : '1???', value : 1},
                                {label : '2???', value : 2},
                                {label : '3???', value : 3},
                                {label : '4???', value : 4},
                                {label : '5???', value : 5},
                                {label : '6???', value : 6},
                                {label : '7???', value : 7},
                                {label : '8???', value : 8},
                                {label : '9???', value : 9},
                                {label : '10???', value : 10},
                                {label : '11???', value : 11},
                                {label : '12???', value : 12},
                                {label : '13???', value : 13},
                                {label : '14???', value : 14},
                                {label : '15???', value : 15},
                                {label : '16???', value : 16},
                                {label : '17???', value : 17},
                                {label : '18???', value : 18},
                                {label : '19???', value : 19},
                                {label : '20???', value : 20},
                                {label : '21???', value : 21},
                                {label : '22???', value : 22},
                                {label : '23???', value : 23},
                                {label : '24???', value : 24},
                                {label : '25???', value : 25},
                                {label : '26???', value : 26},
                                {label : '27???', value : 27},
                                {label : '28???', value : 28},
                                {label : '29???', value : 29},
                                {label : '30???', value : 30},
                            ]}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachLine}>
                      <TouchableOpacity
                        onPress={editPlant}
                        style={styles.editbutton}>
                        <Text style={styles.editbutton_text}>
                          ??????
                        </Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        
    </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

export default Edit_plant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    flex : 3,
    backgroundColor : "#F5F5F5",
    justifyContent : "center",
    alignItems: "center",
  },
  menu: {
    flex : 2,
    backgroundColor: "skyblue",
    justifyContent:"center",
    flexDirection : "row",
    paddingHorizontal:20
  },
  option: {
    flex: 1,
    backgroundColor:"skyblue",
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems:"center",
    paddingHorizontal : 20,
    borderBottomColor : "black",
    borderBottomWidth : 2
  },
  body : {
    flex : 15,
    paddingTop: 15,
    paddingBottom : 30,
    paddingLeft : 20,
    paddingRight : 20
  },
  list: {
    flex : 1,
    paddingTop : 50,
    paddingBottom : 40,
    paddingHorizontal : 40
  },
  eachLine: {
    flex:1,
    flexDirection:"row",
    paddingTop : 10,
    paddingBottom : 10,
    alignContent:"center",
    justifyContent:"center",
  },
  contentText: {
    fontSize : 18,
    fontWeight: "500",
  },
  inputTag: {
    flex:1,
    justifyContent : "center"
  },
  inputField: {
    flex:1,
    justifyContent: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  editbutton: {
    marginTop: 20,
    width: 50,
    height: 30,
    color: "white",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  editbutton_text:{
    fontSize: 15,
    fontWeight: "400",
  }
});