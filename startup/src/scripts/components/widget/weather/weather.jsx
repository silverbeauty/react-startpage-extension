import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import GenericWeather from './generic-weather/generic-weather';
import './weather.scss';

class Weather extends React.Component {

    constructor() {
        super();
        this.state = {
            name: null,
            temp: null,
        };
    }

    componentDidMount() {
        const { city, country, appid, units } = this.props;

        axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: `${city},${country}`,
                APPID: appid,
                units,
            },
        }).then((response) => {

            const { data } = response;
            this.setState({ name: data.name, temp: data.main.temp });
        });
    }

    render() {
        const { name, temp } = this.state;
        return (
            <div className="weather">
                <GenericWeather city={name} temp={temp} />
            </div>   
        );
    }
}

Weather.propTypes = {
    city: PropTypes.string.isRequired,
    country: PropTypes.string,
    appid: PropTypes.string.isRequired,
    units: PropTypes.string,
};

Weather.defaultProps = {
    city: 'London',
    country: 'UK',
    appid: 'aa4577ca1d3b56e7f2e3f6312fd31e34',
    units: 'metric',
};

export default Weather;