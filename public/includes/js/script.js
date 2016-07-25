
$(document).ready(function()
{
    $(".search").click(function()
    {

        var table = document.getElementById("myTable");
        var modify_modal=document.getElementById("modify_modal");
        $.ajax({
                	type:'GET',
                	url: 'http://localhost:8080/employee/',	
                	dataType:'json',
        	success: function(jsonData)
        	{

        		$(jsonData).each(function(i,val)
                {
            	            		
            		var row = table.insertRow();

					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    var cell7 = row.insertCell(6);
                    var cell8 = row.insertCell(7);
                    var cell9 = row.insertCell(8);
					
					var id = val.id;
					var name = val.name;
                    var gender = val.gender;
                    var experience = val.experience;
                    var email = val.email;
                    var address = val.address;
                    var contact = val["contact no"];
                    var age = val.age;

					
					cell1.innerHTML = id;
                    cell2.innerHTML = name;
                    cell3.innerHTML = gender;  
                    cell4.innerHTML = age;  
                    cell5.innerHTML = experience;  
                    cell6.innerHTML = email;                              
                    cell7.innerHTML = address;  
                    cell8.innerHTML = contact;  
                    cell9.innerHTML = '<button class="btn btn-default modify" id="'+id+'" data-toggle="modal" data-target="#modify_modal">modify</button>  <button class="btn btn-default delete" id="'+id+'">delete</button>'                                             
                    
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
        	},
        	error: function()
        	{
        			alert('Error in Loading');
        	}
        });
    });
});