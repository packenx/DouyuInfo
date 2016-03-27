var crosProxy = "https://cors-anywhere.herokuapp.com/";

function getJson(loadURL) {
var jsonData = null;
function loadJson(path) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', path, true);
	httpRequest.setRequestHeader("X-Requested-With", "O");
	httpRequest.onreadystatechange = function (e){
		var httpRequest = e.target;
		if(httpRequest.readyState == 4) {
			if(httpRequest.status == 200) {
				jsonData = JSON.parse(httpRequest.responseText);
			} else {
				jsonData = "error";
			}
		}
	};
	httpRequest.send(null);
}
loadJson(loadURL);
var c = setInterval(function(){
	if(jsonData != null) clearInterval(c);
	if((jsonData != "error") && (jsonData != null)) showInfo(jsonData);
},100);
}

function showInfo(JDA) {
    if(JDA.error != 0) return null;
    console.log(JDA);
    // console.log("+"+JDA.error+"+");
    if(typeof(JDA.data.room_name) != "undefined") {
        document.getElementById("room_name").innerHTML=JDA.data.room_name;
    }
    if(typeof(JDA.data.room_id) != "undefined") {
        document.getElementById("room_id").innerHTML=JDA.data.room_id;
    }
    if(typeof(JDA.data.owner_uid) != "undefined") {
        document.getElementById("owner_uid").innerHTML=JDA.data.owner_uid;
    }
    if(typeof(JDA.data.nickname) != "undefined") {
        document.getElementById("nickname").innerHTML=JDA.data.nickname;
    }
    if(typeof(JDA.data.show_details) != "undefined") {
        document.getElementById("show_details").innerHTML=JDA.data.show_details;
    }
    if(typeof(JDA.data.online) != "undefined") {
        document.getElementById("online").innerHTML=JDA.data.online;
    }
    if(typeof(JDA.data.owner_weight) != "undefined") {
        document.getElementById("owner_weight").innerHTML=JDA.data.owner_weight;
    }
    if(typeof(JDA.data.fans) != "undefined") {
        document.getElementById("fans").innerHTML=JDA.data.fans;
    }
	if(typeof(JDA.data.owner_avatar) != "undefined") {
        document.getElementById("owner_avatar").src=JDA.data.owner_avatar;
    }
	if(typeof(JDA.data.room_src) != "undefined") {
        document.getElementById("room_src").src=JDA.data.room_src;
    }
    if(typeof(JDA.data.show_status) != "undefined") {
        document.getElementById("show_status").innerHTML=JDA.data.show_status;
    }
    if(typeof(JDA.data.hls_url) != "undefined") {
        document.getElementById("hls_url").innerHTML=JDA.data.hls_url;
    }
	if(typeof(JDA.data.black) != "undefined") {
        document.getElementById("black").innerHTML=JDA.data.black.join();
    }
	if( (typeof(JDA.data.rtmp_url) != "undefined") && (typeof(JDA.data.rtmp_live) != "undefined") ) {
        document.getElementById("rtmp_live").innerHTML=JDA.data.rtmp_url+"/"+JDA.data.rtmp_live;
    }
    if( (typeof(JDA.data.rtmp_url) != "undefined") && (typeof(JDA.data.rtmp_multi_bitrate.middle) != "undefined") ) {
        document.getElementById("rtmp_middle").innerHTML=JDA.data.rtmp_url+"/"+JDA.data.rtmp_multi_bitrate.middle;
    }
    if( (typeof(JDA.data.rtmp_url) != "undefined") && (typeof(JDA.data.rtmp_multi_bitrate.middle2) != "undefined") ) {
        document.getElementById("rtmp_middle2").innerHTML=JDA.data.rtmp_url+"/"+JDA.data.rtmp_multi_bitrate.middle2;
    }
}

function updateRoomInfo (roomID) {
      var baseURL = "http://www.douyutv.com/api/v1/room/" + roomID;
      var urlMid = "?aid=android&client_sys=android&time=";
      var time = Math.ceil(Date.now()/1000);
      var auth = md5("room/"+roomID+urlMid+time+"1231");
      var requestURL = baseURL + urlMid + time + "&auth=" + auth;
	  getJson(crosProxy+requestURL);
}
