$(document).ready(function()
{
    var initial;
    var final;
    var table = document.getElementById("myTable");
    var modify_modal=document.getElementById("modify_modal");
    var ul=document.getElementById("no");
    $(".search").click(function()
    {
        $(".search").hide();
        $.ajax({
                	type:'GET',
                	url: 'http://localhost:8080/employee/',	
                	dataType:'json',
        	success: function(jsonData)
        	{
                console.log(jsonData.length);
                display(jsonData);
                
                
                    /*MODIFICATION OF A RECORD*/

                $(".modify").click(function(){
                    modification(this.id);
                });

                /*DELETE A ROW*/
                $(".delete").click(function(){
                    deletion(this.id);
                });
        	},
        	error: function()
        	{
        			alert('Error in Loading');
        	}
        });
    });



                    /*FUNCTIONS*/



    function data(i,jsonData){
        var row = table.insertRow();
         row.insertCell(0).innerHTML=jsonData[i].id;
         row.insertCell(1).innerHTML=jsonData[i].name;
         row.insertCell(2).innerHTML=jsonData[i].gender;
         row.insertCell(3).innerHTML=jsonData[i].age;
         row.insertCell(4).innerHTML=jsonData[i].experience;
         row.insertCell(5).innerHTML=jsonData[i].email;
         row.insertCell(6).innerHTML=jsonData[i].address;
         row.insertCell(7).innerHTML=jsonData[i]["contact no"];
         
         row.insertCell(8).innerHTML='<button class="btn btn-default modify" id="'+jsonData[i].id+'" data-toggle="modal" data-target="#modify_modal">modify</button>  <button class="btn btn-danger delete" id="'+jsonData[i].id+'">delete</button>'                    
    };
    function display(jsonData){
        for(var i=0;i<=19;i++){        
          data(i,jsonData);  
        }
        
        for(var j=0;j<=(jsonData.length)/20;j++)
        {
            var k=j+1;
            $("ul.no").append($('<li  class="list" id='+j+'><a href="#">'+k+'</a></li>'));
        }
        $(".list").click(function()
        {
            console.log(this.id);
            initial=this.id*20;
            final=initial+19;
            $("#my_table > tbody").empty();
            for(var i=initial;i<=final;i++){
            data(i);    
            }
        });
    };



    function modification(id){
       //var id=this.id;
        alert(id);
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
                    location.reload();
                },
                error: function()
                {
                        alert('Error in Loading');
                }
            });
        });
    };
    function deletion(id){

        $.ajax({
                type:'DELETE',
                url: 'http://localhost:8080/employee/'+id,
                dataType:'json',
                success: function(jsonData)
                {
                    alert("deleted successfully");
                    location.reload();
                },
                error: function()
                {
                        alert('Error in Loading');
                }
            });
    };
});