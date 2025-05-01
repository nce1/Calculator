import {StyleSheet, Text, View, ScrollView, TextInput, Button} from 'react-native'
import {Picker} from "@react-native-picker/picker";
import react, {useState} from 'react'
import * as FileSystem from 'expo-file-system';

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
    /* Updates the state results */
    const getResults = () => {
        const results = calculateResults(inputs.flowRate, inputs.tempDiff, inputs.film, inputs.lenFlow);
        setResults(results);
    };
    /* Writes to the local file */
    const storeCalculations = async(results: object) => {
        const path = FileSystem.documentDirectory + 'history.bin';
        const jResults = JSON.stringify(results);
        let hArray = [];
        try{
            const binContent = await FileSystem.readAsStringAsync(path, {
            encoding: FileSystem.EncodingType.UTF8,
            });
            if (binContent.trim().length > 0){
                let parsed = JSON.parse(binContent);
                if (Array.isArray(parsed))
                    hArray = parsed;
            }
            hArray.push(results);
            console.log(hArray);
            await FileSystem.writeAsStringAsync(path, JSON.stringify(hArray), {encoding: FileSystem.EncodingType.UTF8});            
        } catch(error){
            console.log(error);
        }
    }
    /* does the calculation */
    function calculateResults(flowRate: string, tempDiff: string, film: string, lenFlow: string){
        const fProps = fluidProps[selectedFluid];
        let fR = parseFloat(flowRate);
        let tD = parseFloat(tempDiff);
        let fT = parseFloat(film);
        let lF = parseFloat(lenFlow);
        if (fProps != null){
            var hTC, hTR, rN, pN;
            let nu, vel = fR / (fProps.rho * fT);

            rN = fProps.rho * vel * lF / fProps.mu;
            pN = fProps.cp * fProps.mu / fProps.k;
            if (rN < 1000)
                nu = 0.664 * (rN**0.5) * (pN**(1/3));
            else if (rN >= 1000 && rN <= 5000)
                nu = 0.023 * (rN**0.8) * (pN**(1/3));
            else
                nu = 0.027 * (rN**0.8) * (pN**(1/3));
            hTC = nu * fProps.k / lF;
            hTR = fR * fProps.cp * tD;
            /* Suggestion: Include other calculation details */
            storeCalculations({hTCoff: hTC, hTRate: hTR, reyNum: rN, pranNum: pN});
            return {display: true, hTCoff: hTC, hTRate: hTR, reyNum: rN, pranNum: pN}; 
        } else
            return {display: false, hTCoff: 1, hTRate: 1, reyNum: 1, pranNum: 1};
    };
    return(
        <ScrollView>
            <Text style={styles.title}>Calculator</Text>
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
        </ScrollView>
    )
}
export default Calculator
const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    }
})