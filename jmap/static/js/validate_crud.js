$('document').ready(function(){
		$('#update').validate(
		{
			//Правила
			rules:{
				"name":{ required:true, maxlength:40 },
				"power":{ required:true },
				"longitude":{ required:true },
				"latitude":{ required:true },
			},
			//Текста предупреждений
			messages:{
				"name":{ required:"<br/><span style='color:red;'>Введите название</a>",
maxlength: "<br/><span style='color:red;'>Максимальное кол-во символов 40 единиц</a>" },
				"power":{ required:"<br/><span style='color:red;'>Введите мощность</a>"},
				"longitude":{required:"<br/><span style='color:red;'>Введите долготу</a>"},
				"latitude":{required:"<br/><span style='color:red;'>Введите широту</a>"}
			},
		})
	});