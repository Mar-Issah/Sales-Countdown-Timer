//The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds). The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.

//The clearInterval() function in javascript clears the interval which has been set by setInterval() function 


const months = [ "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December" ];

const weekdays = [ "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusrday",
    "Friday",
    "Saturday" ];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h3");

// console.log(items); will  give you h4.days, h4.hours, h4.days etc another good feature of query selector

//searching for a specific date you will have to pass in the date as argument. the month is 11 bcos of the 0 index base
let futureDate = new Date(2021,11,16,23,30);
//console.log(futureDate);

//start extracting the values
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

//the tricky ones below. these will only return numbers base on index
let month = futureDate.getMonth();  //11, so use in the array
month = months[ month ];

const date = futureDate.getDate();

let weekday = futureDate.getDay();
//console.log(weekday);       //3, which is thursday, so..
weekday = weekdays[ weekday ];

giveaway.textContent = `Sales ends on ${weekday}, ${date} ${month} ${year}, ${hours}:${minutes}pm `;

//fututre time in ms 
const futureTime = futureDate.getTime();
//console.log(futureTime);    1608175800000


//now write a function to calculate your time
function getRemainingTime() {
    const today = new Date().getTime();
    const diff = futureTime - today;
    //console.log(diff); //will give you the diff in ms
    //1s = 1000ms
    //1min = 60s
    //1hr = 60min
    //1day = 24hrs

    //values in milliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    //calc the days
    let days = diff / oneDay;
    days = Math.floor(days);      //the no. of days =8

    //calc the hours using modulus
    let hours = Math.floor((diff % oneDay) / oneHour);
    //console.log(hours); 4.963119444

    //calc the minutes
    let minutes = Math.floor((diff % oneHour) / oneMinute);

    //calc the seconds
    let seconds = Math.floor((diff % oneMinute) / 1000);

    //set values array
    const values = [ days, hours, minutes, seconds ];

    //for validation. the rerturn put 0 in front of the numbers other wise just return it like that
    function format(item) {
        if (item < 10) {
            return (item = `0${item}`);
        }
        return item;
    }
    
    items.forEach((item, index) => {
        item.innerHTML = format(values[ index ]);
         
//once the diff is less than 0 lear the countdown and display in the inner class this
    if (diff < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h3 class="expired">sorry, this giveaway has expired!</h3>`;
  }          
    });
    
}
// countdown set interval calls the fxn each sec
let countdown = setInterval(getRemainingTime, 1000);

//call the fxn if not the clearinterval will not work
getRemainingTime();





