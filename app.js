 // selector
const generateBtn = document.getElementsByClassName("generate-btn")[0]; 
const randomPinOutput = document.getElementsByClassName("randomPin")[0]; // eta diye box e output pin dekhabo
var digitCount = document.getElementById("digit-count");
//event listener
generateBtn.addEventListener("click", randomNumber);

//function
function getRndInteger() {
   var max= 9999, min = 1000;
   return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randomNumber() {
	var pin = getRndInteger();
	randomPinOutput.value = pin; // eita box e generated number ta dekhabe
}

// ---------------- calculator -----------------//


// selector
const clickedBtn = document.getElementsByClassName("numBtn");
const display = document.getElementsByClassName("display")[0];

for(let i = 0; i < clickedBtn.length; i++){
	var clicked = clickedBtn[i];
	clicked.addEventListener("click", displayNum);
}

function displayNum(event) {

	var item = event.target;  // target diye kon btn click korche seta select korchi.
	var out = display.value; // bortomane display te ki ache seta out e nilam

	if(out.length >= 4){
		alert("No more Four digit input");
		return;
	}
	else{
		digitCount.innerText = (out.length+1) + "/4";
	}
	out = out + item.innerText; // je button e click korche seta concatenate korlam
	display.value = out; // output e seta abar ager moto rekhe dilam
}

/*------------ check similarity ---------------*/

const submitBtn = document.getElementsByClassName("submit-btn")[0];
var actionLeft = document.getElementsByClassName("action-left")[0]; //initialy 3 action left

submitBtn.addEventListener("click", match);
var tryLeft = 3;
function match() { 
	var randomN = randomPinOutput.value;
	var userN   = display.value;

	if(randomN == NaN || randomN == ""){
		
		alert("Generate a random number first");
		return;
	}

	else if(userN == NaN || userN == ""){
		
		alert("Input some number first");
		return;
	}

	else if(randomN == userN){
		//ekhane ekta modal show korte hobe.apatoto alert dilam
		randomPinOutput.value = ""; //box khali kore dilam
		display.value = ""; 
		if(Number(digitCount.innerText) > 0) digitCount.innerText = "0/4";
		$('#myModal1').modal('show');
		tryLeft = 3;
	}
	else{
		//cyle ekhane box khali kore dewa jabe.
		$('#myModal2').modal('show')
		tryLeft = tryLeft - 1;

		/* submit button disable for ten second */
		if(tryLeft <= 0){
			var secondLeft = 5;
			submitBtn.setAttribute('disabled', 'disabled');
			submitBtn.style.backgroundColor = "gray";
			var x = setInterval(function() {
				actionLeft.innerText = "Wait for " + secondLeft + " seconds";
				secondLeft -= 1;
				if(secondLeft == 0){
					submitBtn.removeAttribute('disabled');
					tryLeft = 3;
					actionLeft.innerText = tryLeft + " try left";
					submitBtn.style.backgroundColor = "#495BC3";
					clearInterval(x);
				}
			},  1000);
		}
	}
	display.value = "";
	if(Number(digitCount.innerText) > 0) digitCount.innerText = "0/4";
	actionLeft.innerText = tryLeft + " try left";

}


/* ------------clear and delete -----------*/

const deleteLast = document.getElementsByClassName("deleteLast")[0];
const clear = document.getElementsByClassName("clear")[0];

deleteLast.addEventListener("click", dlt);
clear.addEventListener("click", clr);

function dlt() {
	var out = display.value;
	var len = out.length;
	out = out.slice(0, len-1); // slice kore last index bad dilam
	display.value = out; // last digit bad diye display value abar assign korlam

	if(Number(digitCount.innerText.length) > 0) digitCount.innerText = (out.length) + "/4";
}

function clr() {
	display.value = "";
	digitCount.innerText = "0/4";
}
