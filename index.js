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

//select all elements
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h3");

//searching for a specific date you will have to pass in the date as argument. the month is 11 becauseos of the 0 index base
let futureDate = new Date(2021,11,16,23,30);


//start extracting the values
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

//get week and month from array and use it to display the giveaway text
let month = futureDate.getMonth(); 
month = months[ month ];

const date = futureDate.getDate();

let weekday = futureDate.getDay();
weekday = weekdays[ weekday ];

giveaway.textContent = `Sales ends on ${weekday}, ${date} ${month} ${year}, ${hours}:${minutes}pm `;


const futureTime = futureDate.getTime();

//now write a function to calculate your time
function getRemainingTime() {
    const today = new Date().getTime();
    const diff = futureTime - today;

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

    //for validation. the return put 0 in front of the single numbers other wise just return it like that
    function format(item) {
        if (item < 10) {
            return (item = `0${item}`);
        }
        return item;
    }
    
    items.forEach((item, index) => {
        item.innerHTML = format(values[ index ]);
         
//once the diff or milliseconds is less than 0 clear the countdown and display 
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





