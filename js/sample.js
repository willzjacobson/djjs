// get good sounds for beats (must all be same tempo)
// get good punctuated beats
	// either me with drumbs, or me posting mp3s, or preexisting mp3s
	// a bird, 2 looping beats, a looping drone, 2 congas, a symbol

setTimeout(registerListeners, 3000);

var audios = document.getElementsByTagName('audio');
for (var i = 0; i < audios.length; i++) {
	audios[i].load();
} 

var oneDisabled = false;
var twoDisabled = false;
var threeDisabled = false;
var pauseDisabled = false;
var allPaused = false;
var wasPlaying = [];
var toStart = [];

// if wasPlaying.length === 0, start setinterval when you play something. 
// setinterval 

// Start playing on a loop (playbackRate is changeable). Used in motion event handlers.
function playLoop(element, id) {
	var audio = element.getElementsByTagName('audio')[0];
	if (audio.paused) {
		audio.play();
		wasPlaying.push(audio);
		$('#'+ id).css('borderColor', '#6131bc');
	} else {
		audio.pause();
		var index = wasPlaying.indexOf(audio);
		wasPlaying.splice(index,1);
		$('#'+ id).css('borderColor', '#fff');
		audio.currentTime = 0;
	}
}

// Go back to time 0 and play. Used for nonlooping audio elements with fixed playbackRate. Used in motion event handlers.
function playOnce(element) {
	var audio = element.getElementsByTagName('audio')[0];
	audio.currentTime = 0;
	audio.play();
}

// Pauses all audios without resetting time / Unpauses those that were playing
function pauseAll() {
	var loopers = document.getElementsByClassName('loop');
	if (!allPaused) {
		for (var i = 0; i < audios.length; i++) {
			if (!audios[i].paused) {
				audios[i].pause();
			} 
		}
		$('#pause').css('borderColor', '#b71f1f');
	} else {
		for (var j = 0; j < audios.length; j++) {
			if (wasPlaying.indexOf(audios[j]) >= 0) audios[j].play();
		}
		$('#pause').css('borderColor', '#fff');
	}
	allPaused = !allPaused;
}


function registerListeners(){

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
		playLoop(this, 'one');
		setTimeout(function() {
			oneDisabled = false;
			// 
		}, 500);
	});

	$('#two').on('motion', function(){
		if (twoDisabled) return;
		twoDisabled = true;
		playLoop(this, 'two');
		setTimeout(function() {
			twoDisabled = false;
		}, 500);
	});

	$('#three').on('motion', function(){
		if (threeDisabled) return;
		threeDisabled = true;
		playOnce(this);
		setTimeout(function() {
			threeDisabled = false;
		}, 500);
	});

	$('#pause').on('motion', function() {
		if (pauseDisabled) return;
		pauseDisabled = true;
		pauseAll();
		setTimeout(function() {
			pauseDisabled = false;
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