var app = angular.module('myApp', []);
app.controller('MyCntrl', function($scope, $http) {
	var strt=0;
	$scope.searchAll=function(){
		strt=0;
		$http.get("http://localhost:8081/employee/?_start="+strt+"&_limit=20")
		.success(function(response) {$scope.names = response;
		});
	};
	$scope.search=function(){
		strt=0;
		$http.get("http://localhost:8081/employee/?q="+$scope.help+"&_start="+strt+"&_limit=20")
		.success(function(response) {$scope.names = response;
		});
	};
	var search1=function(){
		$http.get("http://localhost:8081/employee/?q="+$scope.help+"&_start="+strt+"&_limit=20")
		.success(function(response) {$scope.names = response;
		});
	}
	var searchAll1=function(){
		$http.get("http://localhost:8081/employee/?_start="+strt+"&_limit=20")
		.success(function(response) {$scope.names = response;
		});
	}
	$scope.next=function(){
		strt=strt+20;
		if($scope.help==undefined){
			searchAll1();
		}
		else
		{
		search1();
		}
	};
	$scope.prev=function(){
		strt=strt-20;
		if($scope.help==undefined){
			searchAll1();
		}
		else
		{
			search1();
		}
	};
	$scope.addRow = function(){
		var dataItem={
			name:$scope.name,
			gender:$scope.gender,
			age:$scope.age,
			experience:$scope.experience,
			email:$scope.email,
			address:$scope.address,
			contact:$scope.contact
		}
		return $http({
			method: 'POST',
			url: 'http://localhost:8081/employee/',
			dataType:'json',
			data:JSON.stringify(dataItem),
			contentType: "application/json; charset=utf-8"
		}).then(function successCallback(response) {
			alert("get");
			$scope.name='';
			$scope.gender='';
			$scope.age='';
			$scope.experience='';
			$scope.email='';
			$scope.address='';
			$scope.contact='';
		},
		function errorCallback(response) {
			alert("not get");
			$scope.name='';
			$scope.gender='';
			$scope.age='';
			$scope.experience='';
			$scope.email='';
			$scope.address='';
			$scope.contact='';
		});
	};
	$scope.delete = function(id){
		return $http({
			method: 'DELETE',
			url: 'http://localhost:8081/employee/'+id,
		}).then(function successCallback(response) {
			alert("delete");
			$scope.search();
		},
		function errorCallback(response) {
			alert("not delete");
		});
	};
	var x;
	$scope.modify=function(y){
		x=y.id;
		console.log(y.name);

		$scope.name1=y.name;
		$scope.gender1=y.gender;
		$scope.age1=y.age
		$scope.experience1=y.experience;
		$scope.email1=y.email;
		$scope.address1=y.address;
		$scope.contact1=y.contact;
	};
	$scope.modifyRow = function(){
		var dataItem={
			name:$scope.name1,
			gender:$scope.gender1,
			age:$scope.age1,
			experience:$scope.experience1,
			email:$scope.email1,
			address:$scope.address1,
			contact:$scope.contact1
		}
		return $http({
			method: 'PUT',
			url: 'http://localhost:8081/employee/'+x,
			dataType:'json',
			data:JSON.stringify(dataItem),
			contentType: "application/json; charset=utf-8"
		}).then(function successCallback(response) {
			alert("modified");
			$scope.search();
			$scope.name1='';
			$scope.gender1='';
			$scope.age1='';
			$scope.experience1='';
			$scope.email1='';
			$scope.address1='';
			$scope.contact1='';
		},
		function errorCallback(response) {
			alert("not modified");
			$scope.name1='';
			$scope.gender1='';
			$scope.age1='';
			$scope.experience1='';
			$scope.email1='';
			$scope.address1='';
			$scope.contact1='';
		});
	};
});