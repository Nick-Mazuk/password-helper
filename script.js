var generate; //The HTML IDs are the variable names
var validate;
var memorize;
var validateLoc;
var memorizeLoc;
var page;
var genContent;
var genAlphabet;
var genNumbers;
var genPunctuation;
var genOtherNonalphanumericCharacters;
var genAlphabetList = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var genNumbersList = "0123456789";
var genPunctuationList = "!&;:'\",.?()";
var genOtherNonalphanumericCharactersList = "`~@#$%^*-+=|\\{}[]<>/";
var genCustomCharCheck;
var genCustomChar;
var genMin;
var genMax;
var genSpecificLength;
var genGenerate;
var genPassword;
var valContent;
var valInput;
var valPercentage;
var valScoreBarInner;
var valLength;
var valFixes;
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
	genAlphabet = document.getElementById("genAlphabet");
	genNumbers = document.getElementById("genNumbers");
	genPunctuation = document.getElementById("genPunctuation");
	genOtherNonalphanumericCharacters = document.getElementById("genOtherNonalphanumericCharacters");
	genCustomCharCheck = document.getElementById("genCustomCharCheck");
	genCustomChar = document.getElementById("genCustomChar");
	genMin = document.getElementById("genMin");
	genMax = document.getElementById("genMax");
	genSpecificLength = document.getElementById("genSpecificLength");
	genGenerate = document.getElementById("genGenerate");
	genPassword = document.getElementById("genPassword");
	valContent = document.getElementById("valContent");
	valInput = document.getElementById("valInput");
	valPercentage = document.getElementById("valPercentage");
	valScoreBarInner = document.getElementById("valScoreBarInner");
	valLength = document.getElementById("valLength");
	valVariety = document.getElementById("valVariety");
	valPatterns = document.getElementById("valPatterns");
	valFixes = document.getElementById("valFixes");
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
	genGenerate.addEventListener("click", function(){genGeneratePassword();});
	memEasy.addEventListener("click", function(){memChangeLevel(1);});
	memMedium.addEventListener("click", function(){memChangeLevel(2);});
	memHard.addEventListener("click", function(){memChangeLevel(3);});
	memShowPass.addEventListener("click", function(){memShowPassword()});
	memRestart.addEventListener("click", function(){memNewPassword()});
	about.addEventListener("click", function(){toggleAbout()});
	memPass.style.display = "none";
	valInput.onkeypress = function(e){if (!e) e = window.event;var keyCode = e.keyCode || e.which;if (keyCode == '13'){valAnalyze();}}
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

function genGeneratePassword() {
	var length;
	if(genSpecificLength.value != "") {
		length = parseInt(genSpecificLength.value);
	} else {
		var min = 10;
		var max = 16;
		if(genMax.value != "") {
			max = parseInt(genMax.value);
		}
		if(genMin.value != "") {
			min = parseInt(genMin.value);
		}
		length = parseInt(Math.min(min,max) + (Math.abs(max - min) + 1) * Math.random());
	}
	var characterList = "";
	if(genAlphabet.checked) {
		characterList += genAlphabetList;
	}
	if(genNumbers.checked) {
		characterList += genNumbersList;
	}
	if(genPunctuation.checked) {
		characterList += genPunctuationList;
	}
	if(genOtherNonalphanumericCharacters.checked) {
		characterList += genOtherNonalphanumericCharactersList;
	}
	if(genCustomCharCheck.checked) {
		var string = genCustomChar.value;
		string = deleteChar(string," ");
		for(i = 0; i < characterList.length; i++) {
			string = deleteChar(string,characterList.substring(i,i+1));
		}
		characterList += string;
	}
	var output = "";
	for(i = 0; i < length; i++) {
		var location = parseInt(Math.random() * characterList.length);
		output += characterList.substring(location,location + 1);
	}
	genPassword.innerHTML = output;
}

function valAnalyze() {
	var password = valInput.value;
	valFixes.innerHTML = "";
	var lengthScore = valAnalyzeLength(password);
	var varietyScore = valAnalyzeVariety(password);
	var wordScore = valAnalyzePatterns(password);
	var scores = [lengthScore,varietyScore,wordScore];
	var score = Math.round(average(scores));
	valScoreBarInner.style.width = score + "%";
	if(score <= 60) {
		valPercentage.style.color = "#CC2200";
	} else if(score <=75) {
		valPercentage.style.color = "#CCCC00";
	} else if(score < 85) {
		valPercentage.style.color = "#99CC00";
	} else if(score < 95) {
		valPercentage.style.color = "#55CC00";
	} else {
		valPercentage.style.color = "#00CC00";
	}
	valPercentage.innerHTML = score + "%";
}

function valAnalyzeLength(password) {
	var score = (password.length / 10 * 100);
	if(score > 100) {
		score = 100;
	}
	valLength.innerHTML = "Length: " + score + "%";
	if(password.length < 10) {
		valFixes.innerHTML += "Short password, add at least " + (10 - password.length) + " characters<br>"
	}
	return score;
}

function valAnalyzeVariety(password) {
	var score = 0;
	score += valAnalyzeVarietyHelper(password,genAlphabetList.substring(0,26),"lower case letters"); //gets lower case
	score += valAnalyzeVarietyHelper(password,genAlphabetList.substring(26,genAlphabetList.length),"capital letters"); //gets Upper Case
	score += valAnalyzeVarietyHelper(password,genNumbersList,"numbers"); //gets numbers
	score += valAnalyzeVarietyHelper(password,genPunctuationList + genOtherNonalphanumericCharactersList,"non alphanumeric characters");
	score = score / 8 * 100
	valVariety.innerHTML = "Variety: " + Math.round(score) + "%";
	return score;
}

function valAnalyzeVarietyHelper(password,string,type) {
	var count = 0;
	for(i = 0; i < string.length; i++) {
		if(password.indexOf(string.substring(i,i+1)) != -1) {
			count++;
		}
		if(count >= 2) {
			break;
		}
	}
	if(count < 2) {
		valFixes.innerHTML += "If possible, add " + (2 - count) + " more " + type + "<br>";
	}
	return count;
}

function valAnalyzePatterns(password) {
	var checkList = [commonWords];
	password = password.toLowerCase();
	var count = 0;
	for(i = 0; i < checkList.length; i++) {
		for(j = 0; j < checkList[i].length; j++) {
			if(checkList[i][j].length <= 2) {
				continue;
			}
			if(password.indexOf(checkList[i][j].toLowerCase()) != -1) {
				count++;
				valFixes.innerHTML += "Remove the word \"" + checkList[i][j].toLowerCase() + "\"<br>";
			}
			var leet = valToLeet(checkList[i][j].toLowerCase());
			for(k = 1; k < leet.length; k++) {
				if(password.indexOf(leet[k]) != -1) {
					valFixes.innerHTML += "Remove the Leet Speak version of \"" + leet[0] + "\"<br>"; //BUG: for some reason words with an E (3) get documented twice. The loop runds twice without changing the value of k
					count += 0.5;
					/*console.log(leet)
					console.log(k);*/
				}
			}
		}
	}
	//console.log(count);
	return 50;
}

function valToLeet(word) {
	var list = [word];//figure out a way to make a single word be all permutations of L33T SP34k, including different substitutions when possible.
	var leetList = [["o","0"],["e","3"]];
	for(l = 0; l < word.length; l++) {
		for(m = 0; m < leetList.length; m++) {
			if(leetList[m][0] == word.substring(l,l+1)) {
				var listLength = list.length;
				for(n = 0; n < listLength; n++) {
					for(o = 1; o < leetList[m].length; o++) {
						list.push(list[n].substring(0,l) + leetList[m][o] + list[n].substring(l+1,word.length));
					}
				}
			}
			continue;
		}
	}
	return list;
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
	if(aboutInformation.style.maxHeight != "0px" && aboutInformation.style.maxHeight != 0) {
		aboutInformation.style.maxHeight = "0px";
	} else {
		aboutInformation.style.maxHeight = "1000px";
	}
}

function deleteChar(string, char) {
	var i = 0;
	while(i < string.length) {
		if(string.substring(i,i+1) == char) {
			string = string.substring(0,i) + string.substring(i+1,string.length);
		} else {
			i++;
		}
	}
	return string;
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

//some long variables that would make the code look messy if they were up top
var commonWords = ["Ailurophile", "Assemblage", "Becoming", "Beleaguer", "Brood", "Bucolic", "Bungalow", "Bungalow", "Comely", "Conflate", "Cynosure", "Dalliance", "Demesne", "Demure", "Denouement", "Desuetude", "Desultory", "Diaphanous", "Dissemble", "Dulcet", "Ebullience", "Effervescent", "Efflorescence", "Elision", "Elixir", "Eloquence", "Embrocation", "Emollient", "Ephemeral", "Epiphany", "Erstwhile", "Ethereal", "Evanescent", "Evocative", "Fetching", "Felicity", "Forbearance", "Fugacious", "Furtive", "Gambol", "Glamour", "Gossamer", "Halcyon", "Harbinger", "Imbrication", "Imbroglio", "Imbue", "Incipient", "Ineffable", "Ingénue", "Inglenook", "Insouciance", "Inure", "Labyrinthine", "Lagniappe", "Lagoon", "Languor", "Lassitude", "Leisure", "Lilt", "Lissome", "Lithe", "Love", "Mellifluous", "Moiety", "Mondegreen", "Murmurous", "Nemesis", "Offing", "Onomatopoeia", "Opulent", "Palimpsest", "Panacea", "Panoply", "Pastiche", "Penumbra", "Petrichor", "Plethora", "Propinquity", "Pyrrhic", "Quintessential", "Ratatouille", "Ravel", "Redolent", "Riparian", "Ripple", "Scintilla", "Sempiternal", "Seraglio", "Serendipity", "Summery", "Sumptuous", "Surreptitious", "Susquehanna", "Susurrous", "Talisman", "Tintinnabulation", "Umbrella", "Untoward", "Vestigial", "Wafture", "Wherewithal", "Woebegone", "Supercalifragilisticexpialidocious", "The", "Be", "And", "Of", "A", "In", "To", "Have", "It", "I", "That", "For", "You", "He", "With", "On", "Do", "Say", "This", "They", "At", "But", "We", "His", "From", "That", "Not", "By", "She", "Or", "As", "What", "Go", "Their", "Can", "Who", "Get", "If", "Would", "Her", "All", "My", "Make", "About", "Know", "Will", "As", "Up", "One", "Time", "Their", "Year", "So", "Think", "When", "Which", "Them", "Some", "Me", "People", "Take", "Out", "Into", "Just", "See", "Him", "Your", "Come", "Could", "Now", "Then", "Like", "Other", "How", "Then", "Its", "Our", "Two", "More", "These", "Want", "Way", "Look", "First", "Also", "New", "Because", "Day", "More", "Use", "No", "Man", "Find", "Here", "Thing", "Give", "Many", "Well", "Only", "Those", "Tell", "One", "Very", "Her", "Even", "Back", "Any", "Woman", "Good", "Through", "Us", "Life", "Child", "There", "Work", "Down", "May", "After", "Should", "Call", "Would", "Over", "School", "Still", "Try", "In", "Ask", "Last", "Need", "Too", "Feel", "Three", "When", "State", "Never", "Become", "Between", "High", "Really", "Something", "Most", "Another", "Much", "Family", "Own", "Leave", "Put", "old", "While", "Mean", "Keep", "Student", "Why", "Let", "Great", "Same", "Big", "Group", "Begin", "Seem", "Country", "Help", "Talk", "Where", "Turn", "Problem", "Every", "Start", "Hand", "Might", "American", "Show", "Part", "About", "Against", "Place", "Over", "Such", "Again", "Few", "Case", "Most", "Week", "Company", "Where", "System", "Each", "Right", "Program", "Hear", "Question", "During", "Work", "Play", "Government", "Run", "Small", "Number", "Off", "Always", "Move", "Like", "Night", "Live", "Mr.", "Point", "Believe", "Hold", "Today", "Bring", "Happen", "Next", "Without", "Before", "Large", "All", "Million", "Must", "Home", "Under", "Water", "Room", "Write", "Mother", "National", "Area", "Money", "Story", "ASL", "Young", "Fact", "Month", "Different", "Lot", "Study", "Book", "Eye", "Job", "Work", "Though", "Business", "Issue", "Side", "Kind", "Four", "Head", "Far", "Black", "Long", "Both", "Little", "House", "Yes", "After", "Since", "Long", "Provide", "Service", "Around", "Friend", "Important", "Father", "Sit", "Away", "Until", "Power", "Hour", "Game", "Often", "Yet", "Line", "Political", "End", "Among", "Ever", "Stand", "Bad", "Loose", "However", "Member", "Pay", "Law", "Meet", "Car", "City", "Almost", "Include", "Continue", "Set", "Later", "Community", "Much", "Name", "Five", "Once", "White", "Least", "President", "Learn", "Real", "Change", "Team", "Minute", "Best", "Several", "Idea", "Kid", "Body", "Information", "Nothing", "Ago", "Right", "Lead", "Social", "Understand", "Whether", "Back", "Watch", "Together", "Follow", "Around", "Parent", "Only", "Stop", "Face", "Anything", "Create", "Public", "Already", "Speak", "Others", "Read", "Level", "Allow", "Add", "Office", "Spend", "Door", "Health", "Person", "Art", "Sure", "Such", "War", "History", "Party", "Within", "Grow", "Result", "Open", "Change", "Morning", "Walk", "Reason", "Low", "Win", "Research", "Girl", "Guy", "Early", "Food", "Before", "Moment", "Himself", "Air", "Teacher", "Force", "Offer", "Enough", "Both", "Education", "Across", "Although", "Remember", "Foot", "Second", "Boy", "Maybe", "Toward", "Able", "Age", "Off", "Policy", "Everything", "Process", "Music", "Including", "Appear", "Consider", "Actually", "Buy", "Probably", "Human", "Wait", "Serve", "Market", "Die", "Send", "Expect", "Home", "Sense", "Build", "Stay", "Fall", "Oh", "Nation", "Plan", "Cut", "College", "Interest", "Death", "Course", "Someone", "Experience", "Behind", "Reach", "Local", "Kill", "Six", "Remain", "Effect", "Use", "Yeah", "Suggest", "Class", "Control", "Raise", "Care", "Perhaps", "Little", "Late", "Hard", "Field", "Else", "Pass", "Former", "Sell", "Major", "Somethimes", "Require", "Along", "Development", "Themselves", "Report", "Role", "Better", "Economic", "Effort", "Up", "Decide", "Rate", "Strong", "Possible", "Heart", "Show", "Leader", "Light", "Voice", "Wife", "Whole", "Police", "Mind", "Finally", "Return", "Pull", "Free", "Military", "Price", "Report", "Less", "According", "Decision", "Explain", "Son", "Hope", "Even", "Develop", "View", "Relationship", "Carry", "Town", "Road", "Drive", "Arm", "True", "Federal", "Break", "Better", "Difference", "Thank", "Recieve", "Value", "International", "Building", "Action", "Full", "Model", "Join", "Season", "Society", "Because", "Tax", "Director", "Early", "Position", "Player", "Agree", "Especially", "Accord", "Pick", "Wear", "Paper", "Special", "Space", "Ground", "Form", "Support", "Event", "Official", "Whose", "Matter", "Everyone", "Center", "Couple", "Site", "End", "Project", "Hit", "Base", "Activity", "Star", "Table", "Need", "Court", "Produce", "Eat", "Teach", "Oil", "Half", "Situation", "Easy", "Cost", "Industry", "Figure", "Face", "Street", "Image", "Itself", "Phone", "Either", "Data", "Cover", "Quite", "Picture", "Clear", "Practice", "Piece", "Land", "Recent", "Describe", "Product", "Docter", "Wall", "Patient", "Docter Who?", "Worker", "News", "Test", "Movie", "Certain", "North", "Personal", "Open", "Simply", "Third", "Technology", "Catch", "Step", "Baby", "Computer", "Type", "Attention", "Draw", "Film", "Tree", "Source", "Red", "Nearly", "Organization", "Choose", "Hair", "Cause", "Look", "Point", "Century", "Evidence", "Window", "Difficult", "Listen", "Soon", "Culture", "Billion", "Chance", "Brother", "Energy", "Period", "Course", "Summer", "Less", "Realize", "Hundred", "Available", "Plant", "Likely", "Opportunity", "Term", "Short", "Letter", "Condition", "Choice", "Place", "Single", "Rule", "Daughter", "Administration", "South", "Husband", "Congress", "Floor", "Campaign", "Material", "Population", "Well", "Call", "Economy", "Medical", "Hospital", "Church", "Close", "Thousand", "Risk", "Current", "Fire", "Future", "Wrong", "Involve", "Defense", "Anyone", "Increase", "Security", "Bank", "Myself", "Certainly", "West", "Sport", "Board", "Seek", "Per", "Subject", "Officer", "Private", "Rest", "Behavior", "Deal", "Performance", "Fight", "Throw", "Top", "Quickly", "Past", "Goal", "Bed", "Second", "Order", "Author", "Fill", "Represent", "Focus", "Foreign", "Drop", "Plan", "Blood", "Upon", "Agency", "Push", "Nature", "Color", "No", "Recently", "Store"]; //700,  http://www.englishclub.com/vocabulary/common-words-5000.htm