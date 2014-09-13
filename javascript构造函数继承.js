/*
John Resig JavaScript继承
*/
(function() {
	var initializing = false, fnTest = /xyz/.test(function() { xyz; }) ? /\b_super\b/ : /.*/;
	this.Class = function() { };
	Class.extend = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this();
		initializing = false;
		for (var name in prop) {
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						var tmp = this._super;
						this._super = _super[name];
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		function Class() {
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}
		Class.prototype = prototype;
		Class.constructor = Class;
		Class.extend = arguments.callee;
		return Class;
	};
})();
		
		
var Person = Class.extend({
	// init是构造函数
	init: function(name) {
		this.name = name;
	},
	getName: function() {
		return this.name;
	}
});
// Employee类从Person类继承
var Employee = Person.extend({
	// init是构造函数
	init: function(name, employeeID) {
		//  在构造函数中调用父类的构造函数
		this._super(name);
		this.employeeID = employeeID;
	},
	getEmployeeID: function() {
		return this.employeeID;
	},
	getName: function() {
		//  调用父类的方法
		return "Employee name: " + this._super();
	}
});

/*

var Person = function(name){
	this.name = name;
}
Person.prototype.getName = function(){
	console.log(this.name);
}

var zhang2 = new Person("haha");

console.dir(Person)
console.dir(zhang2)


var	student = function(name,space){
	Person.apply(this, arguments);
	for(var protoKey in Person.prototype){
		console.log(protoKey)
		var proto = this.constructor.prototype;
		if(!proto[protoKey]){
			proto[protoKey] = Person.prototype[protoKey];
		}
		proto[protoKey]["super"] = Person.prototype;
	}
	this.space = space;
};
student.prototype.showName = function(){
	console.log(this.name)
}
var zhang = new student("zhang","beijing");
console.dir(student)
console.dir(zhang)
zhang.getName()




*/