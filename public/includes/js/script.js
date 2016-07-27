
$(document).ready(function()
{
	$(".previous").hide();
	var strt=0;
	var table = document.getElementById("myTable");
	var modify_modal=document.getElementById("modify_modal");
	
	$.ajax({
		type:'GET',
		url: 'http://localhost:8080/employee/?&_start=0&_limit=10', 
		dataType:'json',
		success: function(jsonData)
		{
			
			display(jsonData);
			
		},
		error: function()
		{
			alert('Error in Loading');
		}
	});


	function display(jsonData){
		$(jsonData).each(function(i,val)
		{

			var row = table.insertRow();
			row.insertCell(0).innerHTML=jsonData[i].id;
			row.insertCell(1).innerHTML=jsonData[i].name;
			row.insertCell(2).innerHTML=jsonData[i].gender;
			row.insertCell(3).innerHTML=jsonData[i].age;
			row.insertCell(4).innerHTML=jsonData[i].experience;
			row.insertCell(5).innerHTML=jsonData[i].email;
			row.insertCell(6).innerHTML=jsonData[i].address;
			row.insertCell(7).innerHTML=jsonData[i]["contact no"];

			row.insertCell(8).innerHTML='<button class="btn btn-default modify glyphicon glyphicon-file" id="'+jsonData[i].id+'" data-toggle="modal" data-target="#modify_modal">modify</button><button class="btn btn-danger delete glyphicon glyphicon-trash" id="'+jsonData[i].id+'">delete</button>'                                               

		});
	}



	$(".next").click(function(){
		$(".previous").show();
		strt=strt+10;
		$.ajax({
			type:'GET',
			url: 'http://localhost:8080/employee/?&_start='+strt+'&_limit=10', 
			dataType:'json',
			success: function(jsonData)
			{
				$("#my_table > tbody").empty();
				display(jsonData);

			},
			error: function()
			{
				alert('Error in Loading');
			}
		});
	});



		$(".previous").click(function(){
			strt=strt-10;
			if(strt==0)
			{
				$(".previous").hide();
			}
			$.ajax({
				type:'GET',
				url: 'http://localhost:8080/employee/?&_start='+strt+'&_limit=10', 
				dataType:'json',
				success: function(jsonData)
				{
					$("#my_table > tbody").empty();
					display(jsonData);

				},
				error: function()
				{
					alert('Error in Loading');
				}
			});

		});




		$(".modify").click(function(){
			var id=this.id;

			$("#modify").click(function(){
				var dataItem={
					name:$("#modify_name").val(),                            
					gender:$("#modify_gender").val(),
					age:$("#modify_age").val(),
					experience:$("#modify_experience").val(),
					email:$("#modify_email").val(),
					address:$("#modify_address").val(),
					["contact no"]:$("#modify_contact").val()
				}
				$.ajax({
					type:'PUT',
					url: 'http://localhost:8080/employee/'+id,
					dataType:'json',
					data:JSON.stringify(dataItem),
					contentType: "application/json; charset=utf-8",
					success: function(jsonData)
					{
						alert("modify successfully");
					},
					error: function()
					{
						alert('Error in Loading');
					}
				});
			});
		});

		/*DELETE A ROW*/
		$(".delete").click(function(){
			var id=this.id;
			$.ajax({
				type:'DELETE',
				url: 'http://localhost:8080/employee/'+id,
				dataType:'json',
				success: function(jsonData)
				{
					alert("deleted successfully");
				},
				error: function()
				{
					alert('Error in Loading');
				}
			});
		});

	});