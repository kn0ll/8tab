var Song_View = (function() {
	
	var tmpl = _.template($('#song_view_template').html());

	return Backbone.View.extend({
		
		tagName: 'tr',
		className: 'song',
		
		model: null,
		
		events: {
			'click': 'select',
			'dblclick': 'play'
		},
		
		initialize: function() {
			
			var self = this;
			self.model.view = self;
			
			// when properties / id3 tags on the song
			// get updated, re-render the view row
			self.model.bind('change', function(song) {
				self.render();
			});
			
		},

		// use id3 tags to render a row view
		render: function() {
			$(this.el).html(tmpl(this.model.get('tags')));
		},
		
		// "select" a row
		select: function(e) {
			$(this.el).trigger('select');
		},
		
		// pass up the current song to play
		play: function(e) {
			$(this.el).trigger('play', [this.model]);
		}

	});
	
})();