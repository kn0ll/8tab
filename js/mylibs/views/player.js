var Player_View = (function() {
	
	var test_player = document.createElement('audio'),
		songs = new Songs(),
		$audio;
	
	function canPlay(type, name) {
		if (type === 'ogg') {
		  type = 'audio/ogg; codecs="vorbis"';
		  if (name && !name.match(/(\.ogg|\.oga)/)) {
			return false;
		  }
		} else if (type === 'mp3') {
		  type = 'audio/mpeg;';
		  if (name && !name.match(/\.mp3/)) {
			return false;
		  }
		}
		return !!(test_player.canPlayType && test_player.canPlayType(type).replace(/no/, ''));
	}
	
	return Backbone.View.extend({

		el: $('#player'),
		
		events: {
			'change #uploader': 'upload'
		},
		
		initialize: function() {
			new Songs_View({
				collection: songs
			});
			$audio = $('#audio', this.el);
		},
		
		play: function(song) {
			$audio.attr('src', song.get('url'));
			$audio[0].play();
		},
		
		upload: function(e) {
			var files = e.target.files,
				file;
			for(var i = 0; i < files.length; i++) {
				file = files[i];
				if(canPlay('ogg', file.fileName) || canPlay('mp3', file.fileName)) {
					songs.add({ file: file });
				}
			}
		}

	});
	
})();