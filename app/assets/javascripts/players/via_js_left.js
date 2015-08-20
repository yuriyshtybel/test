var rss_items = [];

$(document).ready(function() {

  var rss_url = 'https://rss.zype.com/videos?active=true&api_key=QprlJOX1HTL02gc35swumuuJmVwvjHH8Avt2-6P_ASRvGDSY6n5iXY6j6RaFp1mh';

  $.get(rss_url, function(data) {
    var $xml = $(data);

    $xml.find("item").each(function(i, cur_item_xml) {
      var cur_item_xml = $(cur_item_xml);
      var playlist_item_template_html = $('#playlist_item_template').html();

      // chrome has a bug regarding 'media:embed' selector
      // http://stackoverflow.com/questions/128580/parsing-xml-with-namespaces-using-jquery-find#comment11181500_128598
      rss_items[i] = {
        id: cur_item_xml.find("guid").text(),
        title: cur_item_xml.find("title").first().text(),
        thumbnail: cur_item_xml.find("media\\:thumbnail[height=\"240\"],thumbnail[height=\"240\"]").attr('url'),
        embed_code: cur_item_xml.find("media\\:embed,embed").text()
      };

      var cur_template = tmpl(playlist_item_template_html, {
        image: rss_items[i].thumbnail,
        title: rss_items[i].title
      });

      $('#playlist ul').append(cur_template);
      $('#playlist ul li:last a').click(function() {
        play_playlist_item(i);
        return false;
      });
    });
    // lets play first playlist item
    play_playlist_item(0);
  });
});

function play_playlist_item(index) {
  $('#player').html(rss_items[index].embed_code);
  $('#playlist ul li').removeClass('active');
  $($('#playlist ul li')[index]).addClass('active');

  setTimeout(function(){ init_player_events(index); }, 1000);
}

function init_player_events(index) {
  var cur_rss_item = rss_items[index];
  var cur_player_instance = jwplayer('zype_'+cur_rss_item.id);

  cur_player_instance.onPlaylistComplete(function(){
    // play from first video, if its the last one
    var next_index = (rss_items.length==index+1) ? 0 : index+1;
    play_playlist_item(next_index);
  });
}
