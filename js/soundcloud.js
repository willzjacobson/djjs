SC.initialize({
  client_id: '0b6cfb2f09b2bc8c0345d9579914a1b9'
});

	//Bird: 
	//"https://api.soundcloud.com/tracks/233127044/stream"

	// SYNTHS
	// "https://api.soundcloud.com/tracks/233116497/stream?client_id=0b6cfb2f09b2bc8c0345d9579914a1b9"
	// "https://api.soundcloud.com/tracks/233116232/stream?client_id=0b6cfb2f09b2bc8c0345d9579914a1b9"
	// "https://api.soundcloud.com/tracks/233116037/stream?client_id=0b6cfb2f09b2bc8c0345d9579914a1b9"
	
	// BEATS
	//"https://api.soundcloud.com/tracks/233134796/stream"
	//"https://api.soundcloud.com/tracks/233134783/stream"
	//"https://api.soundcloud.com/tracks/233134773/stream"

	// high hit: "https://api.soundcloud.com/tracks/233135073/stream"
	// low hit: "https://api.soundcloud.com/tracks/233135087/stream"

	//Shaker "https://api.soundcloud.com/tracks/233135329/stream"

	// ETHNIC DRUMBING
	// 233141894
	// 233141877
	// 233141859

	//STRINGS
	//"https://api.soundcloud.com/tracks/233143259/stream"
	//"https://api.soundcloud.com/tracks/233143239/stream"
	//"https://api.soundcloud.com/tracks/233143227/stream"


//This is how we would attach stream url's if we didn't already have them

// var loopers = document.getElementsByClassName('loop')
$(document).ready(function() {
	SC.get('/users/86625431/tracks').then(function(tracks){
		// var toAppend = '?client_id=0b6cfb2f09b2bc8c0345d9579914a1b9';
		// for (var i = 0; i < loopers.length; i++) {
		// 	loopers[i].setAttribute('src', tracks[i+1].stream_url + toAppend);
		// 	loopers[i].load();
		// }
	});
});
