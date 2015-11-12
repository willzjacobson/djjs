// get good sounds for beats (must all be same tempo)
// get good punctuated beats
	// either me with drumbs, or me posting mp3s, or preexisting mp3s
	// a bird, 2 looping beats, a looping drone, 2 congas, a symbol

setTimeout(registerAll, 1500);

var audios = document.getElementsByTagName('audio');
for (var i = 0; i < audios.length; i++) {
	audios[i].load();
} 

var oneDisabled;
var twoDisabled;

// Start playing on a loop (playbackRate is changeable). Used in motion event handlers.
function playLoop(element) {
	var audio = element.getElementsByTagName('audio')[0];
	if (audio.paused) {
		audio.currentTime = 0;
		audio.play();
	} else {
		audio.pause();
	}
}

// Go back to time 0 and play. Used for nonlooping audio elements with fixed playbackRate. Used in motion event handlers.
function playOnce(element) {
	var audio = element.getElementsByTagName('audio')[0];
	audio.currentTime = 0;
	audio.play();
}

function registerAll(){

	// consider using a debounce utility if you get too many consecutive events
	$(window).on('motion', function(ev, data){
		// console.log('detected motion at', new Date(), 'with data:', data);
		var spot = $(data.spot.el);
		spot.addClass('active');
		setTimeout(function(){
			spot.removeClass('active');
		}, 230);
	});

	// examples for id usage (can use a class as well, if want multiple elements to respond)
	$('#one').on('motion', function(){
		if (oneDisabled) return;
		oneDisabled = true;
		playLoop(this);
		setTimeout(function() {
			oneDisabled = false;
		}, 500);
	});

	$('#two').on('motion', function(){
		if (twoDisabled) return;
		twoDisabled = true;
		playOnce(this);
		setTimeout(function() {
			twoDisabled = false;
		}, 500);
	});

	// increase rate by 0.01 per motion event
	$('#faster').on('motion', function(){
		var audios = document.getElementsByClassName('loop');
		for (var i = 0; i < audios.length; i++) {
			audios[i].playbackRate += 0.01;
			console.log('rate', audios[i].playbackRate);
		}
	});

	// reduce rate by 0.01 per motion event
	$('#slower').on('motion', function(){
		var audios = document.getElementsByClassName('loop');
		for (var i = 0; i < audios.length; i++) {
			audios[i].playbackRate -= 0.01;
			console.log('rate', audios[i].playbackRate);
		}
	});

}