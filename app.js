const dynamicText = document.getElementById("dynamic-text");
const cursor = document.querySelector(".cursor");
const words = [" hard", " fun", " a passion", " a job", " a journey"];
const colors = [
  "#FF3855",
  "#FA5B3D",
  "#FFAA1D",
  "#299617",
  "#2243B6",
  "#9C51B6",
  "#FF7A00", 
  "#FFDB00",
  "#0048BA",
  "#FF007C"
];

let charIndex = 0;
let wordIndex = 0;
let erasingTime = getRandomTime(150, 200);
let typingTime = getRandomTime(250, 350);
const newWordTime = 2000; //time before starting to write new word
const finishedWordTime = 2000; //time before starting to erase word

function type() {
  if (charIndex >= words[wordIndex].length) {
    cursor.classList.remove("blinking"); //remove the blinking of the cursor while erasing
    dynamicText.textContent = dynamicText.textContent.slice(
      0,
      dynamicText.textContent.length - 1
    );
    if (dynamicText.textContent.length === 0) {
      charIndex = 0;
      wordIndex++;
    }
    if (wordIndex >= words.length) {
      wordIndex = 0;
    }
    time = charIndex === 0 ? newWordTime : erasingTime; // if finished erasing word time is 2s, else is erasing time
    if (time === newWordTime) cursor.classList.add("blinking"); //if finished erasing word, cursor starts blinking
    setTimeout(type, time);
  } else {
    cursor.classList.remove("blinking"); //remove blinking of cursor if typing
    if (charIndex === 0) dynamicText.style.color = getRandomColor(); //if at start of the word, get new color
    dynamicText.textContent += words[wordIndex][charIndex];
    charIndex++;
    time = charIndex >= words[wordIndex].length ? finishedWordTime : typingTime;// if finished typing word time is 2s, else is typing time
    if (time === finishedWordTime) cursor.classList.add("blinking");// if finished typing word, cursor start blinking
    setTimeout(type, time);
  }
}

function getRandomTime(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  let max = colors.length - 1;
  let min = 0;
  return colors[Math.round(Math.random() * (max - min) + min)];
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, 2000);
});
