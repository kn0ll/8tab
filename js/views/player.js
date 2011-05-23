// the guts.
// to trigger stuff here, you'd create something
// inside the player that fires events the player hooks into
var Player_View = (function() {
	
	var songs = new Songs(),
		songs_view,
		$audio,
		audio;
		
	var canPlay = (function(doc) {
		
		var test_player = doc.createElement('audio'),
			can_play_mp3 = test_player.canPlayType('audio/mpeg;').replace(/no/, ''),
			can_play_ogg = test_player.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, '');
		
		return function(file) {
			if (file.fileName.match(/(\.ogg|\.oga)/)) {
				return can_play_ogg;
			} else if (file.fileName.match(/(\.mp3)/)) {
				return can_play_mp3;
			} else {
				return false;
			}
		}
		
	})(document);
	
	var view = Backbone.View.extend({

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
			audio = $audio[0];
			
			var $controls = $('#controls', this.el);
			
			// create buttons from the buttons
			$('a', $controls).each(function() {
				var $btn = $(this);
				$btn.button({
					text: false,
					icons: {
						primary: $btn.data('icon')
					}
				});
			});
			
			// volume slider
			$('#volume', $controls).slider({
				min: 0,
				max: 1,
				step: .01,
				value: audio.volume,
                slide: function(e, ui) {
                    audio.volume = ui.value;
                }
            });
			
		},
		
		'play': function(e, song) {
			$audio.attr('src', song.get('url'));
			audio.play();
			this.trigger('play', song);
		},
		
		'upload': function(e) {
			var files = e.target.files,
				file;
			for (var i = 0; i < files.length; i++) {
				file = files[i];
				if (canPlay(file)) {
					songs.add({ file: file });
				}
			}
		},
		
		// @todo these should probably access the songs collection directly
		// instead of traversing DOM (likewise, dom should update on song property
		// like "playing" or something
		
		'next': function() {
			var $playing_row = songs_view.getPlayingRow();	
			$playing_row.next().dblclick();
		},
		
		'prev': function() {
			var $playing_row = songs_view.getPlayingRow();	
			$playing_row.prev().dblclick();
		}

	});
	
	MicroEvent.mixin(view);
	
	return view;
	
})();