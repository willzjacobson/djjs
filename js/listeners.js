// This file is where we handle all the motion responses

// Start all loop audios playing (loopers is defined in soundcloud.js)

var loopers = document.getElementsByClassName('loop');

setTimeout(function() {
	for (var i = 0; i < loopers.length; i++) {
		loopers[i].play();
	}
}, 2000);

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
function playLoop(element, id) {
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
		$('#'+ id).css('borderColor', '#6131bc');
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
		$('#'+ id).css('borderColor', '#fff');
	}
}

// Go back to time 0 and play. Used for nonlooping audio elements with fixed playbackRate. Used in motion event handlers.
function playOnce(element) {
	var audio = element.getElementsByTagName('audio')[0];
	audio.currentTime = 0;
	audio.play();
}

// Mutes / unmutes all audios that were playing
function pauseAll() {
	if (!allPaused) {
		for (var i = 0; i < isPlaying.length; i++) {
			isPlaying[i].muted = true; 
			isPlaying[i].pause();
		}
		$('#pause').css('borderColor', '#b71f1f');
	} else {
		for (var j = 0; j < isPlaying.length; j++) {
			isPlaying[j].muted = false;
			isPlaying[j].play();
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
		playLoop(this, 'three');
		setTimeout(function() {
			threeDisabled = false;
		}, 500);
	});

	$('#four').on('motion', function(){
		if (fourDisabled) return;
		fourDisabled = true;
		playLoop(this, 'four');
		setTimeout(function() {
			fourDisabled = false;
		}, 500);
	});

	$('#five').on('motion', function(){
		if (fiveDisabled) return;
		fiveDisabled = true;
		playLoop(this, 'five');
		setTimeout(function() {
			fiveDisabled = false;
		}, 500);
	});

	$('#six').on('motion', function(){
		if (sixDisabled) return;
		sixDisabled = true;
		playLoop(this, 'six');
		setTimeout(function() {
			sixDisabled = false;
		}, 500);
	});

	$('#seven').on('motion', function(){
		if (sevenDisabled) return;
		sevenDisabled = true;
		playOnce(this);
		setTimeout(function() {
			sevenDisabled = false;
		}, 350);
	});

	$('#eight').on('motion', function(){
		if (eightDisabled) return;
		eightDisabled = true;
		playOnce(this);
		setTimeout(function() {
			eightDisabled = false;
		}, 350);
	});

	$('#nine').on('motion', function(){
		if (nineDisabled) return;
		nineDisabled = true;
		playOnce(this);
		setTimeout(function() {
			nineDisabled = false;
		}, 350);
	});

	$('#ten').on('motion', function(){
		if (tenDisabled) return;
		tenDisabled = true;
		playLoop(this, 'ten');
		setTimeout(function() {
			tenDisabled = false;
		}, 500);
	});

	$('#eleven').on('motion', function(){
		if (elevenDisabled) return;
		elevenDisabled = true;
		playLoop(this, 'eleven');
		setTimeout(function() {
			elevenDisabled = false;
		}, 500);
	});

	$('#twelve').on('motion', function(){
		if (twelveDisabled) return;
		twelveDisabled = true;
		playLoop(this, 'twelve');
		setTimeout(function() {
			twelveDisabled = false;
		}, 500);
	});

	$('#thirteen').on('motion', function(){
		if (thirteenDisabled) return;
		thirteenDisabled = true;
		playLoop(this, 'thirteen');
		setTimeout(function() {
			thirteenDisabled = false;
		}, 500);
	});

	$('#fourteen').on('motion', function(){
		if (fourteenDisabled) return;
		fourteenDisabled = true;
		playLoop(this, 'fourteen');
		setTimeout(function() {
			fourteenDisabled = false;
		}, 500);
	});

	$('#fifteen').on('motion', function(){
		if (fifteenDisabled) return;
		fifteenDisabled = true;
		playLoop(this, 'fifteen');
		setTimeout(function() {
			fifteenDisabled = false;
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
		var audios = document.getElementsByClassName('loop');
		var currentrate;
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