import {StyleSheet, Text, View, TextInput, Button} from 'react-native'
import {Picker} from "@react-native-picker/picker";
import react, {useState} from 'react'

const Calculator = () =>{
    /* Custom types for the fluid properties and results*/
    type FluidProperties = {cp: number; rho: number; mu: number; k: number;};
    type ResultSet = {display: boolean; hTCoff: number; hTRate: number; reyNum: number; pranNum: number;};

    /* State declarations*/
    const [selectedFluid, setSelectedValue] = useState(''); //Picker State
    const [inputs, setInputs] = useState({ //Input States
        flowRate: '',
        tempDiff: '',
        film: '',
        lenFlow: ''
    });
    const [results, setResults] = useState<ResultSet>({ //Output States
        display: false,
        hTCoff: 0,
        hTRate: 0,
        reyNum: 0,
        pranNum: 0,
    });

    /*Updates the input box state*/
    const updateNum = (key: 'flowRate' | 'tempDiff' | 'film' | 'lenFlow', text: string) => {
        if (!isNaN(Number(text)))
            setInputs(prev => ({...prev, [key]: text}));
    };

    /* Fluid Properties */
    const fluidProps: Record<string, FluidProperties> = {
        Water: {cp: 4200, rho: 997, mu: 0.001, k: 0.6},
        Oil: {cp: 2000, rho: 800, mu: 0.05, k: 0.15},
        Glycerin: {cp: 2400, rho: 1260, mu: 1.49, k: 0.28},
        Ethanol: {cp: 2450, rho: 789, mu: 0.0012, k: 0.171},
        CCL: {cp: 855, rho: 1590, mu: 0.0009, k: 0.105},
        COT: {cp: 846, rho: 1.977, mu: 0.0000147, k: 0.0146},
        Air: {cp: 1005, rho: 1.225, mu: 0.0000181, k: 0.0262},
        Nitrogen: { cp: 1040, rho: 1.251, mu: 0.0000179, k: 0.0258},
    };
    const getResults = () => {
        const results = calculateResults(inputs.flowRate, inputs.tempDiff, inputs.film, inputs.lenFlow);
        setResults(results);
    };
    function calculateResults(flowRate: string, tempDiff: string, film: string, lenFlow: string){
        const fProps = fluidProps[selectedFluid];
        let fR = parseFloat(flowRate);
        let tD = parseFloat(tempDiff);
        let fT = parseFloat(film);
        let lF = parseFloat(lenFlow);
        return {display: true, hTCoff: 1, hTRate: 1, reyNum: 1, pranNum: 1};
    };
    return(
        <View>
            <Text className="samp">Calculator</Text>
            <Picker itemStyle={{color: 'blue'}} selectedValue={selectedFluid} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                <Picker.Item label="Select an option" value=""></Picker.Item>
                <Picker.Item label="Water" value="Water"></Picker.Item>
                <Picker.Item label="Oil" value="Oil"></Picker.Item>
                <Picker.Item label="Glycerin" value="Glycerin"></Picker.Item>
                <Picker.Item label="Ethanol" value="Ethanol"></Picker.Item>
                <Picker.Item label="Carbon Tetrachloride" value="CCL"></Picker.Item>
                <Picker.Item label="Carbon Dioxide" value="COT"></Picker.Item>
                <Picker.Item label="Air" value="Air"></Picker.Item>
                <Picker.Item label="Nitrogen" value="Nitrogen"></Picker.Item>
            </Picker>

            <Text className="label">Replace Me</Text>
            <TextInput className="inputBox" placeholder="Flow Rate" value={inputs.flowRate} keyboardType='numeric' onChangeText={text => updateNum('flowRate', text)} style={{height: 50, borderColor: "blue", borderWidth: 2, width: "80%"}} placeholderTextColor="#aaa"></TextInput>
            <TextInput className="inputBox" placeholder="Temperature Difference" value={inputs.tempDiff} keyboardType='numeric' onChangeText={text => updateNum('tempDiff', text)} style={{height: 50, borderColor: "blue", borderWidth: 2, width: "80%"}} placeholderTextColor="#aaa"></TextInput>
            <TextInput className="inputBox" placeholder="Film Thickness" value={inputs.film} keyboardType='numeric' onChangeText={text => updateNum('film', text)} style={{height: 50, borderColor: "blue", borderWidth: 2, width: "80%"}} placeholderTextColor="#aaa"></TextInput>
            <TextInput className="inputBox" placeholder="Length of Flow" value={inputs.lenFlow} keyboardType='numeric' onChangeText={text => updateNum('lenFlow', text)} style={{height: 50, borderColor: "blue", borderWidth: 2, width: "80%"}} placeholderTextColor="#aaa"></TextInput>
            <Button title="Calculate" onPress={getResults}></Button>
            
            {results.display && (
            <Text>Heat Transfer Coefficient: {results.hTCoff}
                  Heat Transfer Rate: {results.hTRate}
                  Reynolds Number: {results.reyNum}
                  Prandtl Number: {results.pranNum}
            </Text>
            )}
        </View>
    )
}
export default Calculator
const styles = StyleSheet.create({})