var Random = {};
var isArray = function(obj) { 
    return Object.prototype.toString.call(obj) === '[object Array]'; 
}
function getC(a,min,max){
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

Random.getInt = function (min, max) {
	var _min = Math.min(min, max);
	return _min + Math.floor((Math.abs(min - max) + 1) * Math.random()) + 0;
}

Random.getBool = function (p) {
	p = isNaN(parseFloat(p)) ? 0.5 : parseFloat(p);
	return Math.random() < p;
}

Random.getRGB = function(r,g,b){
    var rgb = [];
    for(var i=0;i<3;i++){
        var c = arguments[i];
        c = getC(c,0,255);
        c = this.getInt.apply(this,c)
        rgb.push(c);
    }
    return rgb;
}

Random.getRGBA = function(r,g,b,a){
    a = getC(a,0,100);
    var rgba = this.getRGB(r,g,b)
    console.log(a);
    rgba.push(this.getInt.apply(this,a)/100)
    return rgba;
}

Random.getHexRGB = function (r,g,b) {
	var rgb = this.getRGB.apply(this,arguments);
    var Hex = [];
    for(var i=0;i<3;i++){
        var c = rgb[i];
        Hex.push(c>15?c.toString(16):'0'+c.toString(16));
    }
	return Hex.join('');
}




