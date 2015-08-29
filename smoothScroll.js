window.addEventListener("DOMContentLoaded",function(){onLoad2();});

function onLoad2() {
	var about = document.getElementById("about");
	about.addEventListener("mousedown",function(){scrollTo(about.getBoundingClientRect().top,750, true);});
}

function scrollTo(to, duration, isElement) {
	var start = document.documentElement.scrollTop || document.body.scrollTop,
		change = to - start,
		currentTime = 0,
		increment = 20;
	
	if(isElement) {
		change += start;
	}

	var animateScroll = function(){        
		currentTime += increment;
		var val = Math.easeInOutQuad(currentTime, start, change, duration);
		document.body.scrollTop = val;
		document.documentElement.scrollTop = val;
		if(currentTime < duration) {
			setTimeout(animateScroll, increment);
		}
	};
	animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};