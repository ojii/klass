var KlassTests = Klass({
	'test_simple': function(self){
		var C = Klass({
			'__init__': function(self, name){
				self.name = name;
			},
			'greeting': function(self){
				return 'Hi ' + self.name;
			}
		});
		var a = C('a');
		var b = C('b');
		self.assertEqual(a.name, 'a');
		self.assertEqual(b.name, 'b');
		self.assertEqual(a.greeting(), 'Hi a');
		self.assertEqual(b.greeting(), 'Hi b');
	},
	'test_simple_inheritance': function(self){
		var Base = Klass({
			'__init__': function(self, name){
				self.name = name;
			}
		});
		var C = Klass({
			'greeting': function(self){
				return 'Hi ' + self.name;
			}
		}, Base);
		var a = C('a');
		self.assertEqual(a.name, 'a');
		self.assertEqual(a.greeting(), 'Hi a');
	},
	'test_super': function(self){
		var Base = Klass({
			'__init__': function(self, name){
				self.name = name;
			}
		});
		var C = Klass({
			'__init__': function(self, name){
				self.$uper('__init__')(name);
				self.name = 'Super ' + self.name;
			}
		}, Base);
		var a  = Base('a');
		self.assertEqual(a.name, 'a');
		var b  = C('b');
		self.assertEqual(b.name, 'Super b');
	},
	'test_multi_inheritance_siblings': function(self){
		var BaseA = Klass({
			'__init__': function(self, name){
				self.name = name;
			},
			'greeting': function(self){
				return 'Hi ' + self.name;
			}
		});
		var BaseB = Klass({
			'__init__': function(self, name){
				sefl.name = name;
			},
			'goodbye': function(self){
				return 'Goodbye ' + self.name;
			}
		});
		var C = Klass({}, BaseA, BaseB);
		var a = C('a');
		self.assertEqual(a.greeting(), 'Hi a');
		self.assertEqual(a.goodbye(), 'Goodbye a');
	},
	'test_mro_one_level': function(self){
		var BaseA = Klass({
			'__init__': function(self, name){
				self.name = name;
			},
			'greeting': function(self){
				return 'Hi ' + self.name;
			}
		});
		var BaseB = Klass({
			'__init__': function(self, name){
				sefl.name = name;
			},
			'greeting': function(self){
				return 'Hello ' + self.name;
			}
		});
		var C = Klass({}, BaseA, BaseB);
		var a = C('a');
		self.assertEqual(a.greeting(), 'Hi a');
	},
	'test_foreign_class_method_calling': function(self){
		var Greeter = Klass({
			'greeting': function(self){
				return 'Hi ' + self.name;
			}
		});
		var Named = Klass({
			'__init__': function(self, name){
				self.name = name;
			}
		});
		var instance = Named('a');
		self.assertEqual(Greeter.greeting(instance), 'Hi a');
	}
}, unittest.Suite);
unittest.run(KlassTests);
