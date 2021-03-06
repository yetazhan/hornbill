var fs = require('fs')
    ,path = require('path')

var plugins = fs.readdirSync(path.resolve(__dirname,'plugin'))
var _plug = {}
plugins.forEach(function(plug){
    var ext = path.extname(plug)
    if ('.js' != ext && '.json' != ext) return
    var plugfn = require(path.resolve(__dirname,'plugin',plug))
    
    _plug[plug.replace(ext,'')] = plugfn 
})
exports.plugin = _plug

exports.html_encode = function(str){
	str = str || "";
	return str.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/'/g, '&#039;');
}

exports.url_encode = function(str){
	return encodeURIComponent(str);
}


exports.nl2br = function(html){
	if(typeof html != 'string') {
		return  ''
	}
	return html.replace(/\n/g , '<br />')
}
function getStringLengthArr(s , len){
	var w = 0;
	var time = 0;
	for(length=s.length; time<length; ){
		if(/[^\x00-\xff]/.test(s[time])){
			w+=2;
		}else{
			w+=1;
		}	
		time ++;
		if(w >= (len*2)){
			break;	
		}
	}
	return time;
}
function getStringLength(s){
	return s.replace(/[^\x00-\xff]/g,"**").length / 2;
}
