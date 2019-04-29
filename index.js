window.addEventListener("DOMContentLoaded", PiTest);

function PiTest() {
  const canvas = document.getElementById('myCanvas');
  const a = canvas.width; // square edge value
  const r = canvas.width/2; // circle radius value
  
/* Getting table cell names for the variables */
  const pointsInside = document.querySelector('#number1');
  const percent = document.querySelector('#number2');
  const piValue = document.querySelector('#PiResult');  
  
/* Choosing sample size for test */
  let listGroup = document.querySelector('#valueList');
  
  function selectedValues() {
    let listValue = listGroup.value;
    let testNumber = parseInt(listValue);
      
    return testNumber;       
  }
  
  let putNumber = selectedValues();
  
  listGroup.addEventListener('change', selectedValues);

  
/*** Calculating dots position for canvas (numerical part of the test) ***/

  function calculate(putNumber) {
    let coordinates = [];
    let j = 0;

    for (let i = 1; i <= putNumber; i++) {
      /* Double using Math.round() because x nad y values for point (x,y) must be calculate independent!! */
      let x = Math.round((Math.random()) * a);
      let y = Math.round((Math.random()) * a);
      let equation = Math.pow(x-r, 2) + Math.pow(y-r, 2);
      let point = Math.round(Math.sqrt(equation));
      
      coordinates.push(x,y);
      
/* Checking if point is inside the circle (including circle edge) */
      
        if (point <= r) {
          j++;
        }
      
/* Calculating results on the table */
      pointsInside.textContent = j;
      percent.textContent = (j / putNumber * 100).toFixed(1);
      piValue.textContent = (4 * (j/i)).toFixed(2);
    }
      
    return coordinates;
  }
  
  let xyArray = calculate(putNumber);

/*** Drawing point into the canvas (graphical parts of the test) ***/
  function draw() {
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // taking x and y from the array
    for (let i = 0; i < (xyArray.length / 2); i++) {
      let X = xyArray[2*i];
      let Y = xyArray[2*i+1]; 
      
/* (0,0) point is moving to the center of canvas */
      let equation2 = Math.pow(X-r, 2) + Math.pow(Y-r, 2);
      
      let points = Math.round(Math.sqrt(equation2));
      
 /* Make a right color for the points */
        if (points <= r) {
          ctx.fillStyle = 'red';
        }
        else {
          ctx.fillStyle = 'black';
        }
      
/* dots defined as 1x1 pixels rectangles */
      ctx.fillRect(X, Y, 1, 1);
    }
    
    window.requestAnimationFrame(draw);
  }
  
  draw(xyArray);
}
  
let btn = document.querySelector('#testing');
btn.addEventListener('click', PiTest);

/** User can show/hide theoretical description of "Pi test". This saves a lot of document space - it is especially important for mobile devices **/

let showHideButton = document.querySelector('#savespace');

function ShowHideText(showHideButton) {
  let hiddenText = document.querySelector('.description');
  
  if (hiddenText.style.display === 'none') {
    hiddenText.style.display = 'block';
  } else {
    hiddenText.style.display = 'none';
  }
}

showHideButton.addEventListener('click', ShowHideText);