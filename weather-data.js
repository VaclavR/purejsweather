'use strict';

function Weather(cityName, description) {
    this.cityName = cityName.toUpperCase();
    this.description = description;
    this._temperature = '';
}

Object.defineProperty(Weather.prototype, 'temperature', {
    get: function () {
        return this._temperature;
    },
    set: function (value) {
        this._temperature = (value - 273.15).toFixed(1) + ' ℃';
    }
});