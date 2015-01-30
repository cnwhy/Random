var Random = {};

//随机整数,数值范围min,max可对调
Random.getInt = function (min, max) {
	var _min = Math.ceil(Math.min(min, max))
		,_max = Math.floor(Math.max(min, max));
	console.log(_min,_max);
	return _min + Math.floor((Math.abs(_min - _max) + 1) * Math.random()) + 0;
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
*	为正整数v时,随机0-v的值
*	为负整数v时,随机|v|-255的值
*	为数组时v时,随机v[0]-v[1]的值,若v[0]或v[1]不符合取值范围则随机0-255
*	其他随机0-255的值
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
*	为正整数v时,随机0-v的值
*	为负整数v时,随机|v|-255的值
*	为数组时v时,随机v[0]-v[1]的值,若v[0]或v[1]不符合取值范围则随机0-255
*	其他随机0-255的值
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

/**其它方法**/

//打乱数组 (随机抽取法)
Random.arrUpset = function(arr){
	var l = arr.length;
	for(l;l--;){
		var v = arr.splice(Random.getInt(0,l),1)[0]
		arr.push(v);
	}
}

/*
*打乱数组(洗牌算法)
*arr [Array]要打乱的数组
*n [Number]打乱次数
*/
Random.arrUpsetShuffle = function(arr,n){
	n = n ? (n > 1 ? n : 1) : 1;
	var l = arr.length
		,r = arr.length>>1
		,z = l-r;
	for(var i=0;i<n; i++){
		console.log("1");
		var arr_p = arr.splice(Random.getInt(0,z),r);
		while(arr_p.length>0){
			arr.splice(Random.getInt(0,++z),0,arr_p.pop())
		}
	}
}



// function arrUpset1(arr) {
	// arr.sort(function () {
		// return 0.5 - Math.random()
	// })
// }

