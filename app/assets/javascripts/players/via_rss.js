$(document).ready(function() {

  player_instance = jwplayer("player");

  player_instance.setup({
    playlist: "http://content.jwplatform.com/feeds/13ShtP5m.rss",
    displaytitle: false,
    autostart: true,
    width: 680,
    height: 360
  });

  player_instance.on('ready',function() {
    var playlist = player_instance.getPlaylist();
    var playlist_item_template_html = $('#playlist_item_template').html();

    $.each(playlist, function(i, cur_playlist_item){
      var cur_template = tmpl(playlist_item_template_html, {
        image: cur_playlist_item.image,
        title: cur_playlist_item.title
      });

      $("#playlist ul").append(cur_template);
      $('#playlist ul li:last a').click(function() {
        play_playlist_item(i);
        return false;
      });
    });
  });
});

function play_playlist_item(index) {
  player_instance.playlistItem(index);
}
