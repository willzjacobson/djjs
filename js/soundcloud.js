SC.initialize({
  client_id: '0b6cfb2f09b2bc8c0345d9579914a1b9'
});

$(document).ready(function() {

	SC.get('/users/86625431/tracks').then(function(tracks){
		var toAppend = '?client_id=0b6cfb2f09b2bc8c0345d9579914a1b9';
		document.getElementById('sc').setAttribute('src', tracks[2].stream_url + toAppend);
	});

	SC.get('/users/86625431/tracks').then(function(tracks){
		var toAppend = '?client_id=0b6cfb2f09b2bc8c0345d9579914a1b9';
		document.getElementById('sc1').setAttribute('src', tracks[0].stream_url + toAppend);
	});

	SC.get('/users/86625431/tracks').then(function(tracks){
		var toAppend = '?client_id=0b6cfb2f09b2bc8c0345d9579914a1b9';
		document.getElementById('sc2').setAttribute('src', tracks[1].stream_url + toAppend);
	});

});

