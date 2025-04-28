import {StyleSheet, Text, View, TextInput} from 'react-native'
import {Picker} from "@react-native-picker/picker";
import react, {useState} from 'react'

const Calculator = () =>{
    const [selectedValue, setSelectedValue] = useState('');
    const [number, setNumber] = useState('');

    const updateNum = (text: string) => {
        if (!isNaN(Number(text))){
            setNumber(text);
        }
    };

    return(
        <View>
            <Text className="samp">Calculator - css style</Text>
            <Text style={{fontSize: 24}}>In text style</Text>
            <Picker itemStyle={{color: 'blue'}} selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                <Picker.Item label="Select an option" value=""></Picker.Item>
                <Picker.Item label="Water" value="Water"></Picker.Item>
                <Picker.Item label="Oil" value="Oil"></Picker.Item>
                <Picker.Item label="Glycerin" value="Glycerin"></Picker.Item>
                <Picker.Item label="Ethanol" value="Ethanol"></Picker.Item>
                <Picker.Item label="Carbon Tetrachloride" value="Carbon Tetrachloride"></Picker.Item>
                <Picker.Item label="Carbon Dioxide" value="Carbon Dioxide"></Picker.Item>
                <Picker.Item label="Air" value="Air"></Picker.Item>
                <Picker.Item label="Nitrogen" value="Nitrogen"></Picker.Item>

            </Picker>
            <Text className="label">BlahBlh</Text>
            <TextInput placeholder="Enter num1" value={number} keyboardType='numeric' onChangeText={updateNum} style={{height: 50, borderColor: "blue", borderWidth: 2, width: "80%"}} placeholderTextColor="#aaa"></TextInput>
            <TextInput placeholder="Enter num2" value={number} keyboardType='numeric' onChangeText={updateNum} style={{height: 50, borderColor: "blue", borderWidth: 2, width: "80%"}} placeholderTextColor="#aaa"></TextInput>
        </View>
    )
}
export default Calculator
const styles = StyleSheet.create({})