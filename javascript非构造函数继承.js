function deepCopy(p, c) {
　　var c = c || {};
　　for (var i in p) {
　　　　if (typeof p[i] === 'object') {
　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　deepCopy(p[i], c[i]);
　　　　} else {
　　　　　　　c[i] = p[i];
　　　　}
　　}
　　return c;
}


var Chinese = {};
Chinese.name = 1111;
Chinese.test = ["aa","bb"];
Chinese.fun = function(){console.log(this.name)};
var Doctor = deepCopy(Chinese);
Doctor.name2 = 2222;
Doctor.name = 3333;
Doctor.test2 = ["aa","bb"];
Doctor.fun2 = function(){console.log(this.name)};

Chinese.test.push("333")
Chinese.fun();
Doctor.fun2();


console.dir(Chinese);
console.dir(Doctor);