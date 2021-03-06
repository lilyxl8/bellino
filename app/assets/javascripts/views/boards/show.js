Bellino.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],

  className: 'board-show',

  initialize: function () {
    this.listenTo(this.model, "sync add", this.render);
    this.listenTo(this.model.lists(), "add sync remove", this.render);
  },

  render: function () {
    var view = this.template({ board: this.model });
    // display each List
    this.$el.html(view);
    this.model.lists().each( function (list) {
      var listView = new Bellino.Views.ListShow({
        list: list,
        board: this.model
      });
      this.$el.find('.lists').append(listView.render().$el);
    }.bind(this));
    var newListView = new Bellino.Views.ListNew({ collection: this.model });
    this.$el.find('.lists').append(newListView.render().$el);
    return this;
  },
});
