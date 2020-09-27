import React from 'react';

interface AcceptedProps {
    weatherData: {
        temp: number,
        wind: number,
        pressure: number,
        humidity: number,
        current: string,
        icon: string
    }
}

const WeatherDisplay: React.FunctionComponent<AcceptedProps> = (props) => {

    let data = props.weatherData
    let temp = data.temp.toPrecision(2)
    let wind = data.wind.toPrecision(2)
    let pressure = (data.pressure * 0.030).toPrecision(4);
    let icon = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;

    return(
        <div>
                <h2><strong>Current Weather Conditions at Your Location</strong></h2>
                <p>{data.current}</p>
                <img src={icon} alt={data.current}/>
                <h5>Temperature</h5>
                {temp} &#176;
                <h5>Humidity</h5>
                <p> {data.humidity}%</p>
                <h5>Atmospheric Pressure</h5>
                <p> {pressure} inHg</p>
                <h5>Wind Speed</h5>
                <p>{wind} mph</p>
        </div>
    )
}

export default WeatherDisplay;