$(document).ready(function()
{
    $("#add2").click(function()
    {
    	var dataItem={
    		name:$("#name").val(),
   			gender:$("#gender").val(),
   			age:$("#age").val(),
            experience:$("#experience").val(),
            email:$("#email").val(),
            address:$("#address").val(),
            ["contact no"]:$("#contact").val()
    	}
    	$.ajax({
    		type:'POST',
    		url: 'http://localhost:8080/employee/',
    		dataType:'json',
    		data:JSON.stringify(dataItem),
    		contentType: "application/json; charset=utf-8",
    		success: function(jsonData)
        	{
        		alert("added successfully");
               // location.reload()
        	},
        	error: function()
        	{
        			alert('Error in Loading');
        	}

    	});
    });
});