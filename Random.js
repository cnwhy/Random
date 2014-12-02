var Random = {};

//随机整数,数值范围min,max可对调
Random.getInt = function (min, max) {
	var _min = Math.ceil(Math.min(min, max))
        ,_max = Math.floor(Math.max(min, max));
	return _min + Math.floor((Math.abs(_min - max) + 1) * Math.random()) + 0;
}

/**随机布尔值,p为真的几率,默认0.5**/
Random.getBool = function (p) {
	p = isNaN(parseFloat(p)) ? 0.5 : parseFloat(p);
	return Math.random() < p;
}

/**随机颜色**/
var isArray = function(obj) { 
    return Object.prototype.toString.call(obj) === '[object Array]'; 
}
function toArr(a,min,max){
    if(isArray(a) && a[0]>=min && a[0]<=max && a[1]>=min && a[1]<=max){
        return a;
    }else if(typeof a == 'number'){
        if(a >= 0){
            a = [0,a<max?a:max];
        }else{
            a = Math.abs(a);
            a = [a<max?a:max,max]
        }
        return a;
    }else{
        return [min,max];
    }
}
/*
*随机RGB颜色数组
*r,g,b 参数:
*   为正整数v时,随机0-v的值
*   为负整数v时,随机|v|-255的值
*   为数组时v时,随机v[0]-v[1]的值,若v[0]或v[1]不符合取值范围则随机0-255
*   其他随机0-255的值
*/
Random.getRGB = function(r,g,b){
    var rgb = [];
    for(var i=0;i<3;i++){
        var c = arguments[i];
        c = toArr(c,0,255);
        c = this.getInt.apply(this,c)
        rgb.push(c);
    }
    return rgb;
}

/*
*随机RGBA颜色数组
*a参数,透明度的百分值:
*为正整数v时,随机0-v的百分值
*为负整数v时,随机|v|-100的百分值
*为数组时v时,随机v[0]-v[1]的百分值,若v[0]或v[1]不符合取值范围则随机0-255的百分值
*/
Random.getRGBA = function(r,g,b,a){
    a = toArr(a,0,100);
    var rgba = this.getRGB(r,g,b)
    console.log(a);
    rgba.push(this.getInt.apply(this,a)/100)
    return rgba;
}

/*
*随机RGB24位颜色Hex字符串
*r,g,b 参数:
*   为正整数v时,随机0-v的值
*   为负整数v时,随机|v|-255的值
*   为数组时v时,随机v[0]-v[1]的值,若v[0]或v[1]不符合取值范围则随机0-255
*   其他随机0-255的值
*/
Random.getHexRGB = function (r,g,b) {
	var rgb = this.getRGB.apply(this,arguments);
    var Hex = [];
    for(var i=0;i<3;i++){
        var c = rgb[i];
        Hex.push(c>15?c.toString(16):'0'+c.toString(16));
    }
	return Hex.join('');
}



