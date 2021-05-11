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

        if(hours / 24 > 1){
            hours = hours % 24;
        }
        if(hours / 12 > 1){
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

    $( "#hourly" ).click(change)
    $( "#today" ).click(change)
    $( "#weekly" ).click(change)

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
        console.log(hourly);
        // Today
        if(true){
            $(`.today > .container > .item >  #temperature`).text(`${current.temp} F`)
            $(`.today > .container > .item >  #weather`).text(`${current['weather'][0]['main']}`)
            $(`.today > .container > .item >  #feelsLike`).text(`${current.feels_like} F`)
            $(`.today > .container > .item >  #humidity`).text(`${current.humidity}`)
            $(`.today > .container > .item >  #uvi`).text(`${current.uvi}`)
            // $(`.today > .container > .item >  #precipitation`).text(``)
        }

        //Hourly
        if(true){
            
        }
    }
});