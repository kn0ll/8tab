var Songs_View = (function() {
	
	var $selected_row = $(),
		$playing_row = $();
	
	return Backbone.View.extend({

		el: $('#songs'),

		songs: null,

		// these bubble from song_views
		// this way they can pass in their own properties
		// to the event, ie. the song file
		events: {
			'select .song': 'select',
			'play .song': 'play'
		},

		initialize: function() {

			var el = this.el,
				songs = this.collection,
				$tbody = $('tbody', el);

			// when a song gets added to the main songs collection
			// we create a view for it and add it to the songs view list
			songs.bind('add', function(song) {
				var view = new Song_View({ model: song });
				$tbody.append(view.el);
			});

		},

		// "selects" / highlights a row
		// and unselects the previous row
		select: function(e) {
			$selected_row.removeClass('active');
			$selected_row = $(e.target).addClass('active');
		},

		// shows the playing icon on the song row
		// and hides the old playing icon
		play: function(e, song) {
			$playing_row.removeClass('playing');
			$playing_row = $(e.target).addClass('playing');
		},

		getPlayingRow: function() {
			return $playing_row;
		}

	});
	
})();