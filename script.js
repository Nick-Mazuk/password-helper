var generate; //The HTML IDs are the variable names
var validate;
var memorize;
var validateLoc;
var memorizeLoc;
var page;
var genContent;
var genCustomCharCheck;
var genCustomChar;
var valContent;
var memContent;
var memInput;
var memGuess;
var memCorrectness;
var memScore;
var memOverallScore = [];
var memPass;
var memShowPass;
var memPassword = "No password inputted yet";
var memEasy;
var memMedium;
var memHard;
var memLevel = "easy";
var memRestart;
var about;
var aboutInformation;

window.addEventListener("load", function(){onLoad();});

function onLoad() {
	generate = document.getElementById("generate");
	validate = document.getElementById("validate");
	memorize = document.getElementById("memorize");
	page = document.getElementById("page");
	genContent = document.getElementById("genContent");
	genCustomCharCheck = document.getElementById("genCustomCharCheck");
	genCustomChar = document.getElementById("genCustomChar");
	valContent = document.getElementById("valContent");
	memContent = document.getElementById("memContent");
	memInput = document.getElementById("memInput");
	memGuess = document.getElementById("memGuess");
	memCorrectness = document.getElementById("memCorrectness");
	memScore = document.getElementById("memScore");
	memPass = document.getElementById("memPass");
	memShowPass = document.getElementById("memShowPass");
	memEasy = document.getElementById("memEasy");
	memMedium = document.getElementById("memMedium");
	memHard = document.getElementById("memHard");
	memRestart = document.getElementById("memRestart");
	about = document.getElementById("about");
	aboutInformation = document.getElementById("aboutInformation");
	validateLoc = generate.offsetWidth + 2 * generate.style.marginLeft + 4;
	memorizeLoc = validateLoc + validate.offsetWidth + 2 * generate.style.marginLeft + 4;
	generate.addEventListener("click", function(){change(1);});
	validate.addEventListener("click", function(){change(2);});
	memorize.addEventListener("click", function(){change(3);});
	memEasy.addEventListener("click", function(){memChangeLevel(1);});
	memMedium.addEventListener("click", function(){memChangeLevel(2);});
	memHard.addEventListener("click", function(){memChangeLevel(3);});
	memShowPass.addEventListener("click", function(){memShowPassword()});
	memRestart.addEventListener("click", function(){memNewPassword()});
	about.addEventListener("click", function(){toggleAbout()});
	memPass.style.display = "none";
	memInput.onkeypress = function(e){if (!e) e = window.event;var keyCode = e.keyCode || e.which;if (keyCode == '13'){memStart();}}
	memGuess.onkeypress = function(e){if (!e) e = window.event;var keyCode = e.keyCode || e.which;if (keyCode == '13'){memCheck();}}
}

function change(location) {
	if(location == 1) {
		page.style.width = generate.offsetWidth + "px";
		page.style.marginLeft = "0px";
		genContent.classList.remove("notShown");
		valContent.classList.add("notShown");
		memContent.classList.add("notShown");
	} else if (location == 2) {
		page.style.width = validate.offsetWidth + "px";
		page.style.marginLeft = validateLoc + "px";
		genContent.classList.add("notShown");
		valContent.classList.remove("notShown");
		memContent.classList.add("notShown");
	} else {
		page.style.width = memorize.offsetWidth + "px";
		page.style.marginLeft = memorizeLoc + "px";
		genContent.classList.add("notShown");
		valContent.classList.add("notShown");
		memContent.classList.remove("notShown");
	}
}

function genCustomCharChange() {
	if(genCustomChar.value.length > 0) {
		genCustomCharCheck.checked = true;
	} else {
		genCustomCharCheck.checked = false;
	}
}

function memStart() {
	memPassword = memInput.value;
	memInput.style.opacity = 0;
	setTimeout(function(){memInput.style.display = "none";skipTransition(memInput,function(){memInput.style.top = "100px"})},750);
	memGuess.style.display = "inline-block";
	setTimeout(function(){memGuess.style.opacity = 1;memGuess.style.top = "45px";},1);
	memGuess.focus();
	memPass.innerHTML = memPassword;
	memShowPass.style.display = "block";
}

function memNewPassword() {
	memInput.value = "";
	memPassword = "No password inputted yet";
	memPass.innerHTML = memPassword;
	memGuess.style.opacity = 0;
	setTimeout(function(){memGuess.style.display = "none";skipTransition(memGuess,function(){memGuess.style.top = "100px"})},750);
	memInput.style.display = "inline-block";
	setTimeout(function(){memInput.style.opacity = 1;memInput.style.top = "45px";},1);
	memInput.focus();
	memShowPass.style.display = "none";
}

function memCheck() {
	if(memLevel == "easy" || memLevel == "medium") {
		if(memGuess.value == memPassword) {
			memCorrectness.innerHTML = "Correct";
			memUpdateScore(true);
			memCorrectness.style.color = "#33CC33";
			memCorrectness.style.fontSize = "1em";
			skipTransition(memCorrectness,function(){memCorrectness.style.opacity = 1;});
			setTimeout(function(){memCorrectness.style.opacity = 0;},756);
		} else {
			memUpdateScore(false);
			memCorrectness.innerHTML = "";
			memCorrectness.style.fontSize = "1.5em";
			if(memGuess.value.length <= memPassword.length) {
				for(i = 0; i < memGuess.value.length; i++) {
					if(memGuess.value.substring(i,i+1) == memPassword.substring(i,i+1))
						memCorrectness.innerHTML += memPassword.substring(i,i+1);
					else 
						memCorrectness.innerHTML += "&bull;";
				}
				for(i = memGuess.value.length; i < memPassword.length; i++)
					memCorrectness.innerHTML += "_";
				memCorrectness.style.color = "#CC2200";
				skipTransition(memCorrectness,function(){memCorrectness.style.opacity = 1;});
				setTimeout(function(){memCorrectness.style.opacity = 0;},1000);
			} else {
				for(i = 0; i < memPassword.length; i++) {
					if(memGuess.value.substring(i,i+1) == memPassword.substring(i,i+1))
						memCorrectness.innerHTML += memPassword.substring(i,i+1);
					else 
						memCorrectness.innerHTML += "&bull;";
				}
				memCorrectness.innerHTML += "<del>" + memGuess.value.substring(memPassword.length,memGuess.value.length) + "</del>";
				memCorrectness.style.color = "#CC2200";
				skipTransition(memCorrectness,function(){memCorrectness.style.opacity = 1;});
				setTimeout(function(){memCorrectness.style.opacity = 0;},1000);
			}
		}
	} else {
		memCorrectness.style.fontSize = "1em";
		if(memGuess.value == memPassword) {
			memCorrectness.innerHTML = "Correct";
			memUpdateScore(true);
			memCorrectness.style.color = "#33CC33";
		} else {
			memCorrectness.innerHTML = "Incorrect";
			memUpdateScore(false);
			memCorrectness.style.color = "#CC2200";
		}
		skipTransition(memCorrectness,function(){memCorrectness.style.opacity = 1;});
		setTimeout(function(){memCorrectness.style.opacity = 0;},756);
	}
	memGuess.value = "";
}

function memUpdateScore(correct) {
	if(correct == true) {
		memOverallScore.push(1);
	} else {
		memOverallScore.push(0);
	}
	if(memOverallScore.length > 10)
		memScore.innerHTML = "Score over last 10: " + (Math.round(average(memOverallScore.slice(memOverallScore.length - 10,memOverallScore.length)) * 100)) + "%";
	else
		memScore.innerHTML = "Score over last " + memOverallScore.length + ": " + (Math.round(average(memOverallScore) * 100)) + "%";
}

function memChangeLevel(location) {
	if(location == 1) {
		if(!memEasy.classList.contains("memLevelSelected")) {
			memOverallScore = [];
			memScore.innerHTML = "Score over last 10: No Score";
		}
		memEasy.classList.add("memLevelSelected");
		memMedium.classList.remove("memLevelSelected");
		memHard.classList.remove("memLevelSelected");
		memLevel = "easy";
		memGuess.type = "text";
	} else if (location == 2) {
		if(!memMedium.classList.contains("memLevelSelected")) {
			memOverallScore = [];
			memScore.innerHTML = "Score over last 10: No Score";
		}
		memEasy.classList.remove("memLevelSelected");
		memMedium.classList.add("memLevelSelected");
		memHard.classList.remove("memLevelSelected");
		memLevel = "medium";
		memGuess.type = "password";
	} else {
		if(!memHard.classList.contains("memLevelSelected")) {
			memOverallScore = [];
			memScore.innerHTML = "Score over last 10: No Score";
		}
		memEasy.classList.remove("memLevelSelected");
		memMedium.classList.remove("memLevelSelected");
		memHard.classList.add("memLevelSelected");
		memLevel = "hard";
		memGuess.type = "password";
	}
}

function memShowPassword() {
	if(memPass.style.display == "none") {
		memShowPass.innerHTML = "Hide your password";
		memPass.style.display = "block";
	} else {
		memShowPass.innerHTML = "Show your password";
		memPass.style.display = "none";
	}
}

function average(array) {
	var sum = 0;
	for(i = 0; i < array.length; i++)
		sum += array[i];
	return sum / array.length;
}

function toggleAbout() {
	console.log("clicked");
	if(aboutInformation.style.maxHeight != "0px" && aboutInformation.style.maxHeight != 0) {
		aboutInformation.style.maxHeight = "0px";
	} else {
		console.log("next2");
		aboutInformation.style.maxHeight = "1000px";
		console.log("next3");
	}
}

//code borrowed from Mozilla's X-Tag library http://www.x-tags.org/
var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1];
  return {
    dom: pre == 'ms' ? pre.toUpperCase() : pre,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };

})();

var requestFrame = (function(){
  var raf = window.requestAnimationFrame ||
    window[prefix.lowercase + 'RequestAnimationFrame'] ||
    function(fn){ return window.setTimeout(fn, 20); };
  return function(fn){
    return raf.call(window, fn);
  };
})();

var skipTransition = function(element, fn, bind){
  var prop = prefix.js + 'TransitionProperty';
  element.style[prop] = element.style.transitionProperty = 'none';
  var callback;
  if (fn) callback = fn.call(bind);
  requestFrame(function(){
    requestFrame(function(){
      element.style[prop] = element.style.transitionProperty = '';
      if (callback) requestFrame(callback);
    });
  });
};

//end borrowed code