// This file is where we handle all the motion responses

// Start all loop audios playing (they are muted by default)
var loopers = document.getElementsByClassName('loop');
setTimeout(function() {
	for (var i = 0; i < loopers.length; i++) {
		loopers[i].play();
	}
}, 2000);

// These are some nice variables that we use in our logic below
var fresh = true;
var oneDisabled = false;
var twoDisabled = false;
var threeDisabled = false;
var fourDisabled = false;
var fiveDisabled = false;
var sixDisabled = false;
var sevenDisabled = false;
var eightDisabled = false;
var nineDisabled = false;
var tenDisabled = false;
var elevenDisabled = false;
var twelveDisabled = false;
var thirteenDisabled = false;
var fourteenDisabled = false;
var fifteenDisabled = false;
var pauseDisabled = false;
var rate = 1;
var allPaused = false;
var isPlaying = [];

// In 3 seconds, register all the motion listeners
setTimeout(registerListeners, 3000);

// If it's muted, turn muted on and push into 'isPlaying' memory. Otherwise, mute it and remove it from 'isPlaying'
function playLoop(element) {
	if (fresh) {
		for (var i = 0; i < loopers.length; i++) {
			loopers[i].play();
		}
		fresh = false;
	}
	if (allPaused) return;
	// if nothing's playing, start metronome again
	var audio = element.getElementsByTagName('audio')[0];
	if (isPlaying.indexOf(audio) < 0) {
		audio.muted = false;
		isPlaying.push(audio);
		$('#'+ element.id).css('borderColor', '#6131bc');
	} else {
		audio.muted = true;
		var index = isPlaying.indexOf(audio);
		isPlaying.splice(index,1);
		if (!isPlaying.length) {
			for (var i = 0; i < loopers.length; i++) {
				loopers[i].pause();
				loopers[i].currentTime = 0;
			}
			fresh = true;
		}
		$('#'+ element.id).css('borderColor', '#fff');
	}
}

// Go back to time 0 and play. Used for nonlooping audio elements with fixed playbackRate. 
function playOnce(element) {
	var audio = element.getElementsByTagName('audio')[0];
	audio.currentTime = 0;
	audio.play();
}

// Mutes / unmutes all audios that were playing
function pauseAll() {
	if (!allPaused) {
		for (var i = 0; i < loopers.length; i++) { 
			loopers[i].pause();
		}
		$('#pause').css('borderColor', '#b71f1f');
	} else {
		for (var j = 0; j < loopers.length; j++) {
			loopers[j].play();
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

	function sendToLoop(element, theRightOne) {
		if (window[theRightOne]) return;
		window[theRightOne] = true;
		playLoop(element);
		setTimeout(function() {
			window[theRightOne] = false;
		}, 500);
	}

	function sendToPlayOnce(element, theRightOne) {
		if (window[theRightOne]) return;
		window[theRightOne] = true;
		playOnce(element);
		setTimeout(function() {
			window[theRightOne] = false;
		}, 200);
	}

	// examples for id usage (can use a class as well, if want multiple elements to respond)
	$('#one').on('motion', function(){
		sendToLoop(this, 'oneDisabled');
	});

	$('#two').on('motion', function(){
		sendToLoop(this, 'twoDisabled');
	});

	$('#three').on('motion', function(){
		sendToLoop(this, 'threeDisabled');
	});

	$('#four').on('motion', function(){
		sendToLoop(this, 'fourDisabled');
	});

	$('#five').on('motion', function(){
		sendToLoop(this, 'fiveDisabled');
	});

	$('#six').on('motion', function(){
		sendToLoop(this, 'sixDisabled');
	});

	$('#seven').on('motion', function(){
		sendToPlayOnce(this, 'sevenDisabled');
	});

	$('#eight').on('motion', function(){
		sendToPlayOnce(this, 'eightDisabled');
	});

	$('#nine').on('motion', function(){
		sendToPlayOnce(this, 'nineDisabled');
	});

	$('#ten').on('motion', function(){
		sendToLoop(this, 'tenDisabled');
	});

	$('#eleven').on('motion', function(){
		sendToLoop(this, 'elevenDisabled');
	});

	$('#twelve').on('motion', function(){
		sendToLoop(this, 'twelveDisabled');
	});

	$('#thirteen').on('motion', function(){
		sendToLoop(this, 'thirteenDisabled');
	});

	$('#fourteen').on('motion', function(){
		sendToLoop(this, 'fourteenDisabled');
	});

	$('#fifteen').on('motion', function(){
		sendToLoop(this, 'fifteenDisabled');
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
		var audios = document.getElementsByClassName('loop');
		for (var i = 0; i < audios.length; i++) {
			audios[i].playbackRate += 0.01;
			rate = audios[i].playbackRate;
			console.log('rate', audios[i].playbackRate);
		}
	});

	// reduce rate by 0.01 per motion event. Update global variable rate.
	$('#slower').on('motion', function(){
		var audios = document.getElementsByClassName('loop');
		for (var i = 0; i < audios.length; i++) {
			audios[i].playbackRate -= 0.01;
			console.log('rate', audios[i].playbackRate);
		}
	});
}


