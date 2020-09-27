import React, {Component} from 'react'
import WeatherDisplay from './WeatherDisplay';

type AcceptedProps = {
    
}

interface WeatherData {
        temp: number,
        wind: number,
        pressure: number,
        humidity: number,
        current: string,
        icon: string
}

interface Position {
    latitude: number,
    longitude: number,
}

interface State {
    weatherData: WeatherData,
    position: Position,
    hasData: boolean
}


class Weather extends Component<AcceptedProps, State> {
constructor(props: AcceptedProps) {
    super(props);
    this.state = {
        weatherData: {
            temp: 0,
            wind: 0,
            pressure: 0,
            humidity: 0,
            current: '',
            icon: ''
        },
        position: {
            latitude: 0,
            longitude: 0
        },
        hasData: false
    }
}

getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(res => {
            this.setState({
                position : {
                    latitude: res.coords.latitude,
                    longitude: res.coords.longitude
                }
            })
        });
        this.fetchWeather();
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
}


fetchWeather() {

    const { latitude, longitude } = this.state.position
    const key: string = '78fbc960a755ce0d1c3097d6e8f3e941'
    const weatherURL: string = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`

    fetch(weatherURL)
    .then(res =>res.json())
    .then(data => {
        this.setState({
            weatherData: {
                temp: data.main.temp,
                wind: data.wind.speed,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                current: data.weather[0].main,
                icon: data.weather[0].icon
            },
            hasData: true
        })
    })
    .catch(err => console.log(err))
}

componentDidMount() {
    this.getLocation() 
}

render() {
    return(
    <div>
        {this.state.hasData ? 
        <WeatherDisplay weatherData={this.state.weatherData}/>
        : "Please turn on location" }
    </div>
    )
}
}

export default Weather;