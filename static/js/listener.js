var current_user_id=1 ;
var current_user_name="Daniel";
var server_address = "http://127.0.0.1:5000"

var updateScroll = function() {
  $(".messages").getNiceScroll(0).resize();
  return $(".messages").getNiceScroll(0).doScrollTop(999999, 999);
};

var SendMessage = function() {
  var innerText, otvet;
  innerText = $.trim($("#texxt").val());
  hour = new Date().getHours();
  minutes = new Date().getMinutes();
  user = "yo";
  $(".messages").append("<li class=\"i\"><div class=\"head\"><span class=\"time\">" + (hour) + ":" + (minutes) + " AM, Today</span><span class=\"name\"> "+user+"</span></div><div class=\"message\">" + innerText + "</div></li>");
  ResponseMessage("daniel","ok");
  updateScroll();
};

var ResponseMessage = function(user, message){
    $(".messages").append("<li class=\"friend-with-a-SVAGina\"><div class=\"head\"><span class=\"name\">"+user+"  </span><span class=\"time\">" + (new Date().getHours()) + ":" + (new Date().getMinutes()) + " AM, Today</span></div><div class=\"message\">" + message + "</div></li>");
    updateScroll();
}

$(document).ready(function(){
  conf = {
    cursorcolor: "#696c75",
    cursorwidth: "4px",
    cursorborder: "none"
  };

  lol = {
    cursorcolor: "#cdd2d6",
    cursorwidth: "4px",
    cursorborder: "none"
  };
  $(".list-friends").niceScroll(conf);
  $(".messages").niceScroll(lol);
  var socket = io.connect(server_address)
  socket.on('connect', function(){
    data = JSON.stringify({ username: "current_user_name",
                            message: "text",
                            username_id :"current_user_id",
                            destiny_user_id: "current_friend_chat_id"});
    socket.send('User has connected')
  })
  socket.on('message', function(msg){
    ResponseMessage(received_msg);
  })
  $("#btnmsg").on('click', function(){
    socket.send($("#texxt").val())
    SendMessage();
    $("#texxt").val('')
  })
  $("#texxt").keypress(function(e) {
    if (e.keyCode === 13) {
      SendMessage();
      $("#texxt").val('')
    }
  });
})
