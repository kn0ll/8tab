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
			self.model.bind('change', function(song) {
				self.render();
			});
		},

		render: function() {
			$(this.el).html(tmpl(this.model.get('tags')));
		},
		
		select: function(e) {
			$(this.el).trigger('select', [this.model]);
		},
		
		play: function(e) {
			$(this.el).trigger('play', [this.model]);
		}

	});
	
})();