var Songs_View = Backbone.View.extend({

	el: $('#songs'),

	songs: null,
	
	events: {
		// these bubble from song_views
		'select .song': 'select',
		'play .song': 'play'
	},

	initialize: function() {
		
		var el = this.el,
			songs = this.collection,
			$tbody = $('tbody', el);
			
		songs.bind('add', function(song) {
			var view = new Song_View({ model: song });
			$tbody.append(view.el);
		});
		
	},
	
	select: function(e, song) {
		var $row = $(e.target),
			$active = $('tr.active', this.el);
		$active.removeClass('active');
		$row.addClass('active');
	},
	
	play: function(e, song) {
		var $row = $(e.target),
			$playing = this.getPlaying();
		$playing.removeClass('playing');
		$row.addClass('playing');
	},
	
	getPlaying: function() {
		return $('tr.playing', this.el);
	}

});