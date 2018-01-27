var current_user_name= "";
/*
  Note when you run in local change https to http
*/
var server_address = 'http://' + document.domain + ':' + location.port

console.log(server_address)
var socket;

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
  //ResponseMessage("daniel","ok");
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

  socket = io.connect(server_address)

  socket.on('connect', function(){
    // let data = JSON.stringify({"username": "Server",
    //                         "message": "The user: "+current_user_name+" has just connected" });
    // socket.send(data)
  })

  socket.on('message', function(msg){
    let info = JSON.parse(msg)
    let user = info["username"]
    let mes = info["message"]
    ResponseMessage(user, mes);
  })

  $("#btnmsg").on('click', function(){
    let data = JSON.stringify({"username": current_user_name,
                            "message": $("#texxt").val() });
    socket.send(data)
    SendMessage();
    $("#texxt").val('')
  })

  $("#texxt").keypress(function(e) {
    if (e.keyCode === 13) {
      let data = JSON.stringify({"username": current_user_name,
                              "message": $("#texxt").val() });
      socket.send(data)
      SendMessage();
      $("#texxt").val('')
    }
  });
})
