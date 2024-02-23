import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';

export default function App() {

  const [city, setCity] = useState('');
  const [weatherData, setweatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    
    const API_KEY = 'bb1178dffb414996a4b165003242302'
    
    try{
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=no`)
      const data = await res.json();
      setweatherData(data);
      setError(null);
    }
    catch (e){
      console.error(e)
      setError('Error fetching weather data');
    }
  };
  let weatherImage;
  if (weatherData && weatherData.current.condition.text.toLowerCase() === 'sunny') {
    weatherImage =  require('sol.png');
  } 
  else if (weatherData && weatherData.current.condition.text.toLowerCase() === 'partly cloudy') {
    weatherImage = require('dia-nublado.png');
  }
  else if (weatherData && weatherData.current.condition.text.toLowerCase() === 'rain') {
    weatherImage = require('lluvia.png');
  }
  else if (weatherData && weatherData.current.condition.text.toLowerCase() === 'overcast') {
    weatherImage = require('dia-nublado.png');
  }

  useEffect( () => {
    city ? fetchWeatherData : setError;
  }, [city]);


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weather App Searching ⛅ </Text>
      <Image 
      source={{uri: "https://cdn-icons-png.flaticon.com/512/8426/8426268.png"}} 
      style={{width: 200, height: 200}} 
      />
      <TextInput 
        style={styles.textInput}
        placeholder='Enter your location'
        value={city}
        onChangeText={(text) =>{
          setCity(text);
        }}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={fetchWeatherData}>
        <Text>Get Weather</Text>
      </TouchableOpacity>
      {error && (<Text>{error}</Text>)}
      {weatherData && (
        <>
        <Text style={styles.weatherTxt}>City 🏙️: {weatherData.location.name}</Text>
        <Text style={styles.weatherTxt}>Temperature 🌡️: {weatherData.current.temp_c}</Text>
        <Text style={styles.weatherTxt}>Description ⛅: {weatherData.current.condition.text}</Text>
        </>)}
        {weatherImage && <Image source={weatherImage} style={{width: 200, height: 200, marginTop:'5%'}} />}
  </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#b9f1d6',
    alignItems: 'center',

  },
  title :
  {
    fontSize : 24,
    fontWeight: 'bold',
    marginBottom: '3%',
    marginTop: '7%',
  },
  textInput :
  {
    height: 60,
    width:'80%',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f1f6ce',
    marginBottom: '4%',
  },
  button :
  {
    backgroundColor: '#69d2cd',
    color: '#fff',
    width:250,
    height: 50,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherTxt :
  {
    fontSize : 16,
    fontWeight: 'bold',
    marginTop: '3%',
  },
});
