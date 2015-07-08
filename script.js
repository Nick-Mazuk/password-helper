var generate;
var validate;
var memorize;
var validateLoc;
var memorizeLoc;
var page;
var genContent;
var valContent;
var memContent;
var memInput;
var memGuess;
var memCorrectness;
var memPass;
var memShowPass;
var memPassword = "No password inputted yet";
var memEasy;
var memMedium;
var memHard;
var memLevel = "easy";

//onload function
window.addEventListener("load", function(){onLoad();});

function onLoad() {
	generate = document.getElementById("generate");
	validate = document.getElementById("validate");
	memorize = document.getElementById("memorize");
	page = document.getElementById("page");
	genContent = document.getElementById("genContent");
	valContent = document.getElementById("valContent");
	memContent = document.getElementById("memContent");
	memInput = document.getElementById("memInput");
	memGuess = document.getElementById("memGuess");
	memCorrectness = document.getElementById("memCorrectness");
	memPass = document.getElementById("memPass");
	memShowPass = document.getElementById("memShowPass");
	memEasy = document.getElementById("memEasy");
	memMedium = document.getElementById("memMedium");
	memHard = document.getElementById("memHard");
	validateLoc = generate.offsetWidth + 2 * generate.style.marginLeft + 4;
	memorizeLoc = validateLoc + validate.offsetWidth + 2 * generate.style.marginLeft + 4;
	generate.addEventListener("click", function(){change(1);});
	validate.addEventListener("click", function(){change(2);});
	memorize.addEventListener("click", function(){change(3);});
	memEasy.addEventListener("click", function(){memChangeLevel(1);});
	memMedium.addEventListener("click", function(){memChangeLevel(2);});
	memHard.addEventListener("click", function(){memChangeLevel(3);});
	memShowPass.addEventListener("click", function(){memShowPassword()});
	memPass.style.display = "none";
	memInput.onkeypress = function(e){if (!e) e = window.event;var keyCode = e.keyCode || e.which;if (keyCode == '13'){memStart();}}
	memGuess.onkeypress = function(e){if (!e) e = window.event;var keyCode = e.keyCode || e.which;if (keyCode == '13'){memCheck();}}
}

function change(location) {
	if(location == 1) {
		page.style.width = generate.offsetWidth;
		page.style.marginLeft = "0";
		genContent.classList.remove("notShown");
		valContent.classList.add("notShown");
		memContent.classList.add("notShown");
	} else if (location == 2) {
		page.style.width = validate.offsetWidth;
		page.style.marginLeft = validateLoc;
		genContent.classList.add("notShown");
		valContent.classList.remove("notShown");
		memContent.classList.add("notShown");
	} else {
		page.style.width = memorize.offsetWidth;
		page.style.marginLeft = memorizeLoc;
		genContent.classList.add("notShown");
		valContent.classList.add("notShown");
		memContent.classList.remove("notShown");
	}
}

function memStart() {
	memPassword = memInput.value;
	memInput.style.opacity = 0;
	setTimeout(function(){memInput.style.display = "none"},750);
	memGuess.style.display = "inline-block";
	setTimeout(function(){memGuess.style.opacity = 1;memGuess.style.top = 15;},1);
	memGuess.focus();
	memPass.innerHTML = memPassword;
	memShowPass.style.display = "block";
}

function memRestart() {

}

function memCheck() {
	if(memLevel == "easy") {

	} else if(memLevel == "medium") {

	} else {
		if("\"" + memGuess + "\"" == memPassword) {
			memCorrectness.innerHTML = "Correct";
			memUpdateScore(true);
			memCorrectness.style.color = "#33CC33";
		} else {
			memCorrectness.innerHTML = "Incorrect";
			memUpdateScore(false);
			memCorrectness.style.color = "#CC2200";
		}
		skipTransition(memCorrectness,function(){memCorrectness.style.opacity = 1;});
		setTimeout(function(){memCorrectness.style.opacity = 1;},1000);
	}
}

function memUpdateScore(correct) {

}

function memChangeLevel(location) {
	if(location == 1) {
		memEasy.classList.add("memLevelSelected");
		memMedium.classList.remove("memLevelSelected");
		memHard.classList.remove("memLevelSelected");
		memLevel = "easy";
		memGuess.type = "text";
	} else if (location == 2) {
		memEasy.classList.remove("memLevelSelected");
		memMedium.classList.add("memLevelSelected");
		memHard.classList.remove("memLevelSelected");
		memLevel = "medium";
		memGuess.type = "password";
	} else {
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