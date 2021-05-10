function Time(time, limit = 'min') {
    let milliseconds = parseInt((time % 1000)),
        seconds = Math.floor((time / 1000) % 60),
        minutes = Math.floor((time / (1000 * 60)) % 60),
        hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (limit == 'sec') {
        return hours + ':' + minutes + ':' + seconds;
    } else if (limit == 'min') {
        return hours + ':' + minutes;
    } else if (limit == 'hour') {
        return hours;
    } else {
        return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
    }
}

fetch('./weather.json')
    .then(response => response.json())
    .then(data => init(data));

function init(json) {
    let { lat, lon, current, daily, hourly, ...otherObj } = json
    console.log(current);
    console.log(Time(current['sunrise']))
    console.log(Time(current['sunset']))
    console.log(Time(current['dt']))
}
