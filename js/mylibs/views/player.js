var Player_View = (function() {
	
	var test_player = document.createElement('audio'),
		songs = new Songs(),
		songs_view,
		$audio,
		audio,
		$controls;
	
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
			'change #uploader': 'upload',
			'click .prev': 'prev',
			'click .next': 'next',
			'play': 'play'
		},
		
		initialize: function() {
			
			songs_view = new Songs_View({
				collection: songs
			});
			
			$audio = $('#audio', this.el);
			$controls = $('#controls', this.el);
			audio = $audio[0];
			
			$('a', $controls).each(function() {
				var $btn = $(this);
				$btn.button({
					text: false,
					icons: {
						primary: $btn.data('icon')
					}
				});
			});
			
		},
		
		'prev': function() {
			var $playing = songs_view.getPlaying();	
			$playing.prev().dblclick();
		},
		
		'next': function() {
			var $playing = songs_view.getPlaying();	
			$playing.next().dblclick();
		},
		
		'play': function(e, song) {
			$audio.attr('src', song.get('url'));
			audio.play();
		},
		
		'upload': function(e) {
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