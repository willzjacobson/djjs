// get good sounds for beats (must all be same tempo)
// get good punctuated beats
	// either me with drumbs, or me posting mp3s, or preexisting mp3s
	// a bird, 2 looping beats, a looping drone, 2 congas, a symbol

setTimeout(registerListeners, 3000);

var audios = document.getElementsByTagName('audio');
var loopers = document.getElementsByClassName('loop');
var oneDisabled = false;
var twoDisabled = false;
var threeDisabled = false;
var pauseDisabled = false;
var audioLength;
var intervalId;
var rate = 1;
var allPaused = false;
var isPlaying = [];
var toStart = [];

for (var i = 0; i < audios.length; i++) {
	audios[i].load();
} 

// toStart has actual audio elements in it, not id's
// setinterval : for each thing in toStart, set currenttime to remove a downbeat, and start them. then reset toStart.  time = 1 downbeat (relative to rate)

function startSetInterval() {
	return setInterval(function() {
		// toStart is full of audio elements waiting to be paused or played since the last downbeat
		for (var i = 0; i < toStart.length; i++) {
			audioLength = toStart[i].duration;
			console.log('audioLength', audioLength);
			// If an audio in the toStart queue is not currently playing: start playing, change its parent div's border color, and push it into the 'currently playing' array;
			if (toStart[i].paused) {
				toStart[i].play();
				$(toStart[i]).closest('div').css('borderColor', '#6131bc');
				isPlaying.push(toStart[i]);
			} else {
			// If an audio in the toStart queue is already playing, pause it, change its parent div's border color, splice it out of the 'currently playing' array, 
			// and reset its currentTime attribute so it picks up on-beat next time it's played (time to set to depends on the current playbackRate for all 'loop' audio elements)
				toStart[i].pause();
				$(toStart[i]).closest('div').css('borderColor', '#fff');
				var index = isPlaying.indexOf(toStart[i]);
				isPlaying.splice(index,1);
				toStart[i].currentTime = 0;
			}
		}
		toStart = [];
		// if nothing is playing now, stop and reset the metronome
		if (!isPlaying.length) clearInterval(intervalId);
		console.log('tick');
		// default rate is 120 bpm, so a 1/4 beat is half a second * (1 / playbackRate)
		var blah = audioLength * 1000 * (1/rate)
		console.log(blah)
		console.log('rate', rate)
	}, audioLength * 1000 * (1/rate));
}

// Start playing on a loop (playbackRate is changeable). If nothing is already playing, start metronome. Used in motion event handlers.
function playLoop(element) {
	if (allPaused) return;
	var audio = element.getElementsByTagName('audio')[0];
	// if nothing's playing, start metronome again
	if (!isPlaying.length) {
		intervalId = startSetInterval();
		audio.play();
		$(audio).closest('div').css('borderColor', '#6131bc');
		isPlaying.push(audio);
	} else {
		// if there's other stuff going on in the state, push the audio element into 'toStart' queue and it'll get taken care of in setInterval (above)
		toStart.push(audio);
	}
}

// Go back to time 0 and play. Used for nonlooping audio elements with fixed playbackRate. Used in motion event handlers for 'non-loop' elements.
function playOnce(element) {
	var audio = element.getElementsByTagName('audio')[0];
	audio.currentTime = 0;
	audio.play();
}

// Pauses all audios without resetting time / Unpauses those that were playing
function pauseAll() {
	if (!allPaused) {
		// Perform this block when setinterval fires!
		for (var i = 0; i < loopers.length; i++) {
			if (!loopers[i].paused) {
				loopers[i].pause();
			} 
		}
		// Stop the metronome so it's in sync with music when we start again.
		clearInterval(intervalId);
		$('#pause').css('borderColor', '#b71f1f');
	} else {
		for (var j = 0; j < loopers.length; j++) {
			if (isPlaying.indexOf(loopers[j]) >= 0) loopers[j].play();
		}
		// If anything is being unpaused, start setInterval again
		if (isPlaying.length) intervalId = startSetInterval(); 
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
		playLoop(this);
		setTimeout(function() {
			oneDisabled = false;
			// 
		}, 500);
	});

	$('#two').on('motion', function(){
		if (twoDisabled) return;
		twoDisabled = true;
		playLoop(this);
		setTimeout(function() {
			twoDisabled = false;
		}, 500);
	});

	$('#three').on('motion', function(){
		if (threeDisabled) return;
		threeDisabled = true;
		playLoop(this);
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

	// increase rate by 0.01 per motion event. Update global variable rate.
	$('#faster').on('motion', function(){
		for (var i = 0; i < loopers.length; i++) {
			loopers[i].playbackRate += 0.01;
			rate = loopers[i].playbackRate;
			console.log('rate', loopers[i].playbackRate);
		}
	});

	// reduce rate by 0.01 per motion event. Update global variable rate.
	$('#slower').on('motion', function(){
		for (var i = 0; i < loopers.length; i++) {
			loopers[i].playbackRate -= 0.01;
			rate = loopers[i].playbackRate;
			console.log('rate', loopers[i].playbackRate);
		}
	});

}