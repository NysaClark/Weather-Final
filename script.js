`use strict`

$(function () {
    function Time(time, limit = 'min') {
        let milliseconds = parseInt((time % 1000)),
            seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor((time / (1000 * 60)) % 60),
            hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        meridies = 'am'

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        if (hours / 24 > 1) {
            hours = hours % 24;
        }
        if (hours / 12 > 1) {
            hours = hours % 12;
            meridies = 'pm'
        }

        if (limit == 'sec') {
            return `${hours}:${minutes}:${seconds} ${meridies}`;
        } else if (limit == 'min') {
            return `${hours}:${minutes} ${meridies}`;
        } else if (limit == 'hour') {
            return hours;
        } else {
            return `${hours}:${minutes}:${seconds}.${milliseconds} ${meridies}`;
        }
    }

    function uvIndex (uv) {
        let output = ''
        if(uv < 3){
            output = 'Low'
        } else if (uv < 6){
            output = 'Moderate'
        } else if (uv < 8){
            output = 'High'
        } else if (uv < 11){
            output = 'Very High'
        } else {
            output = 'Extreme'
        }

        return(output)
    }

    $("#hourly").click(change)
    $("#today").click(change)
    $("#weekly").click(change)

    function change() {
        let id = this.id
        $(`body > :not(.${id}):not(.doNotRemove)`).hide();
        $(`.${id}`).show()
        $('.active').removeClass('active')
        $(this).addClass('active')
    }

    $(`body > :not(.today):not(.doNotRemove)`).hide();

    fetch('./weather.json')
        .then(response => response.json())
        .then(data => init(data));

    function init(json) {
        let { lat, lon, current, daily, hourly, ...otherObj } = json
        console.log(current);
        // Today
        if (true) {
            $(`.today > .container > .item >  #temperature`).text(`${current.temp} F`);
            $(`.today > .container > .item >  #weather`).text(`${current['weather'][0]['main']}`);
            $(`.today > .container > .item >  #time`).text(`${Time(current.dt)}`);
            $(`.today > .container > .item >  .feelsLike`).text(`${current.feels_like} F`);
            $(`.today > .container > .item >  .humidity`).text(`${current.humidity}%`);
            $(`.today > .container > .item >  .uvi`).text(`${uvIndex(current.uvi)} (${current.uvi})`);
            // $(`.today > .container > .item >  #precipitation`).text(``)
        }

        //Hourly
        if (true) {
            for (let i = 0; i < 24; i++) {
                $(`.hourly > .contain > #${i + 1} > .weather`).text(`${hourly[i]['weather'][0]['main']}`)
                $(`.hourly > .contain > #${i + 1} > .temp`).text(`${Math.round(hourly[i]['temp'])} F`)
                $(`.hourly > .contain > #${i + 1} > div > .humidity`).text(`${hourly[i]['humidity']}%`)
                $(`.hourly > .contain > #${i + 1} > div > .uvi`).text(`${uvIndex(hourly[i]['uvi'])} (${hourly[i]['uvi']})`)
                $(`.hourly > .contain > #${i + 1} > div > .pressure`).text(`${hourly[i]['pressure']}`)
            }
        }

        // Weekly
        if (true) {
            for (let i = 0; i < 7; i++) {
                $(`.weekly > .contain > #day${i + 1} > .weath`).text(`${daily[i]['weather'][0]['main']}`)
                $(`.weekly > .contain > #day${i + 1} > .temp`).text(`${Math.round(daily[i]['temp']['day'])} F`)
                $(`.weekly > .contain > #day${i + 1} > div > .maxTemp`).text(`${Math.round(daily[i]['temp']['max'])} F`)
                $(`.weekly > .contain > #day${i + 1} > div > .minTemp`).text(`${Math.round(daily[i]['temp']['min'])} F`)
            }
        }
    }
});