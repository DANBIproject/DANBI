import React, { useState } from "react";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import {sendInfo, currentID} from './Main.js'
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
import axios from "axios";

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

function Edit_person ({navigation}) {
  const placeholder = "input time";
  const [isWakeupTimePickerVisible, setWakeupTimePickerVisibility] = useState(false);
  const [isSleepTimePickerVisible, setSleepTimePickerVisibility] = useState(false);
  const [text_wakeup, onChangeText_wakeup] = useState(new Date("Wed Dec 08 2021 " + sendInfo.result[0].wakeup_time.slice(0,8) + " GMT+0900 (KST)").format("a/p hh:mm"));
  const [text_sleep, onChangeText_sleep] = useState(new Date("Wed Dec 08 2021 " + sendInfo.result[0].bed_time.slice(0,8) + " GMT+0900 (KST)").format("a/p hh:mm"));

  const showWakeupTimePicker = () => {
    setWakeupTimePickerVisibility(true);
  };

  const showSleepTimePicker = () => {
    setSleepTimePickerVisibility(true);
  }

  const hideWakeupTimePicker = () => {
    setWakeupTimePickerVisibility(false);
  };

  const hideSleepTimePicker = () => {
    setSleepTimePickerVisibility(false);
  };

  const handleConfirm_wakeup = (date) => {
    setWakeup(date);
    hideWakeupTimePicker();
    onChangeText_wakeup(date.format("a/p hh:mm"));
  };

  const handleConfirm_sleep = (date) => {
    setBedtime(date);
    hideSleepTimePicker();
    onChangeText_sleep(date.format("a/p hh:mm"));
  };

  const [nickname, setNickname] = useState(sendInfo.result[0].nickname);
  const [weightInput, setWeightInput] = useState(String(sendInfo.result[0].weight));
  const [wakeup, setWakeup] = useState("Wed Dec 08 2021 " + sendInfo.result[0].wakeup_time.slice(0,8) + " GMT+0900 (KST)");
  const [bedtime, setBedtime] = useState("Wed Dec 08 2021 " + sendInfo.result[0].bed_time.slice(0,8) + " GMT+0900 (KST)");
  const [tempInput, setTempInput] = useState(String(sendInfo.result[0].temperature));
  const [goalInput, setGoalInput] = useState(String(sendInfo.result[0].intake_goal));
  const [text_cycle, setText_cycle] = useState(String(sendInfo.result[0].cycle));

  const editPerson = () => {

      axios.post("http://35.212.138.86/member/editmemberinfo", {
        member_id : currentID,
        nickname : nickname,
        weight : weightInput,
        wakeup_time : wakeup,
        bed_time : bedtime,
        temperature : tempInput,
        intake_goal : goalInput,
        cycle : text_cycle
      }).then(function(response) {
        navigation.goBack();
      }).catch(function (error) {
      }).then(function() {
      });
  };
  

  return (
    
    <ImageBackground source = {require('../Source/reg_background.png')} style = {styles.backgroundimage}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.list}>
          <View style={styles.eachLine}>
            <View style={styles.inputTag}>
              <Text style={styles.contentText}>닉네임</Text>
            </View>
            <TextInput 
             onChangeText={setNickname}
             value={nickname}
             style={styles.inputField}
             placeholder = {nickname}
             placeholderTextColor="gray"/>
          </View>
          <View style={styles.eachLine}>
            <View style={styles.inputTag}>
              <Text style={styles.contentText}>체중</Text>
            </View>
            <View style={styles.inputField} flexDirection="row" justifyContent="space-between" alignItems="center">
                <TextInput 
                 onChangeText={setWeightInput}
                 value={weightInput}
                 placeholder = {weightInput}
                 placeholderTextColor = "gray"
                 keyboardType="number-pad"/>
                <Text>kg</Text>
            </View>
          </View>
          <View style={styles.eachLine}>
            <View style={styles.inputTag}>
              <Text style={styles.contentText}>기상 시간</Text>
            </View>
            <TouchableOpacity onPress={showWakeupTimePicker} style={styles.inputField}>
              <TextInput
              pointerEvent="none"
              placeholder={text_wakeup}
              placeholderTextColor="gray"
              editable={false}
              value={text_wakeup}
              />
              <DateTimePickerModal
              headerTextIOS={placeholder}
              isVisible={isWakeupTimePickerVisible}
              mode="time"
              onConfirm={handleConfirm_wakeup}
              onCancel={hideWakeupTimePicker}
              minuteInterval={10}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.eachLine}>
            <View style={styles.inputTag}>
              <Text style={styles.contentText}>취침 시간</Text>
            </View>
            <TouchableOpacity onPress={showSleepTimePicker} style={styles.inputField}>
              <TextInput
              pointerEvent="none"
              placeholder={text_sleep}
              placeholderTextColor="gray"
              editable={false}
              value={text_sleep}
              />
              <DateTimePickerModal
              headerTextIOS={placeholder}
              isVisible={isSleepTimePickerVisible}
              mode="time"
              onConfirm={handleConfirm_sleep}
              onCancel={hideSleepTimePicker}
              minuteInterval={10}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.eachLine}>
            <View style={styles.inputTag}>
              <Text style={styles.contentText}>선호 물 온도</Text>
            </View>
            <View style={styles.inputField} flexDirection="row" justifyContent="space-between" alignItems="center">
                <TextInput 
                onChangeText={setTempInput}
                value={tempInput}
                placeholder = {tempInput}
                placeholderTextColor = "gray"
                keyboardType="number-pad"/>
                <Text>°C</Text>
            </View>
          </View>
          <View style={styles.eachLine}>
            <View style={styles.inputTag}>
              <Text style={styles.contentText}>목표 수분 섭취량</Text>
            </View>
            <View style={styles.inputField} flexDirection="row" justifyContent="space-between" alignItems="center">
                <TextInput 
                onChangeText={setGoalInput}
                value={goalInput}
                placeholder = {goalInput}
                placeholderTextColor = "gray"
                keyboardType="number-pad"/>
                <Text>mL</Text>
            </View>
          </View>
          <View style={styles.eachLine}>
            <View style={styles.inputTag}>
              <Text style={styles.contentText}>수분 섭취 주기</Text>
            </View>

            <TouchableOpacity
            style={styles.inputField}>
                <RNPickerSelect
                placeholder={{
                    label : text_cycle,
                    color : "gray",
                }}
                value={text_cycle}
                onValueChange={(value)=>setText_cycle(value)}
                items={[
                    {label : '30분', value : "30"},
                    {label : '1시간', value : "60"},
                    {label : '1시간 30분', value : "90"},
                    {label : '2시간', value : "120"},
                    {label : '2시간 30분', value : "150"},
                    {label : '3시간', value : "180"},
                ]}/>
            </TouchableOpacity>
          </View>
          <View style={styles.eachLine}>
          <TouchableOpacity
              onPress={editPerson}
              style={styles.editbutton}>
              <Text style={styles.editbutton_text}>
                수정
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

export default Edit_person;

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
    marginTop: 10,
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
