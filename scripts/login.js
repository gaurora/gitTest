/*
 * @project SKILL Tool
 * @name    people listing JS file
 * @author  akatoch@sapient.com
 
 * @description- this module controls the login functionality of SKILL
 */
var SKILL = SKILL || {};

"use strict";
(function() {
	if(sessionStorage.login){
		console.log("here");
	}
	var userSubmit = $("#loginSubmitBtn");
		userSubmit.on('click', function(event) {
			event.preventDefault(); 
			var xhr,
			data,
			error,
			userName,
			userPassword;
			userName = $("#username").val();
			userPassword = $("#password").val();
			$.post( SKILL.Config.serviceURLs.newloginService, { username: userName, password: userPassword },function( response) {
			    if(response.success === true)
			    {
			    	$.ajax({
	                    url: SKILL.Config.serviceURLs.permission,
	                    type: 'GET',
	                    beforeSend : function( xhr ) {
	                       xhr.setRequestHeader( 'x-access-token',response.token);
	                    },
	                    success : function ( data ){
							sessionStorage.login = 'success';
							sessionStorage.userInformation=JSON.stringify(data);
							$(location).attr('href', '../index.html');
	                    },
	                    error : function ( error ) {
	                       // console.log("inside error=="+err);
	                    }
	                });
			    	
			    	// SKILL.login(response);
			    	//SKILL.skills.createDom();
			    }
			    else {
			 		$(".error-message").html("Invalid username/password");
					$('.username').addClass('error');
	                $('.password').addClass('error');
	            }
			});



						

			// $.ajax({
			// 	url: SKILL.Config.serviceURLs.newloginService,
			// 	method: "post",
			// 	data: {
			// 		username: userName,
			// 		password: userPassword
			// 	},
			// 	success: function(response) {

			// 			if (response.success === true) {
			// 				
			// 				//sessionStorage.setItem('login','success');
			// 				$(location).attr('href', '../index.html');
			// 			} else {
			// 				$(".error-message").html("Invalid username/password");
			// 				$('.username').addClass('error');
			// 				$('.password').addClass('error');

			// 			}
			// 		}
					// 	function( response) {
					//     console.log( "................",response);
					//     console.log(  "jhxjhwgcwghghvhgv",response.success );
					//     if(response.success === true)
					//     {

				//     	// SKILL.login(response);
				//     	SKILL.skills.createDom();
				//     }else {
				//  		$(".error-message").html("Invalid username/password");
				// 		$('.username').addClass('error');
				//                  $('.password').addClass('error');

				// 	}
				// }

				// 	headers: {"x-access-header": data.token},
				// 	success:function(result){
				// 		console.log(result);
				// 		sessionStorage.setItem('userDetails', JSON.stringify(result));
				// 	}
			//});
			/*
			 * Function : login
			 * Role : To display error message if input field left blank or invalid login and
			 *			and redirect to general info page on successful login after storing 
			 *			info in session storage
			 * @Param : data
			 */
			// SKILL.login = function(data) {
			// 	if (data.token) {
			// 		SKILL.skills.createDom();
			// 		// $.get( "http://10.207.5.225:5353/auth/getpermissions",function( response) {
			// 		//     console.log(  response);    

			// 		//   });
			// 		// .......................>>>>>>>>$.ajax({
			// 		// 	url:"http://10.207.5.225:5353/auth/getpermissions",
			// 		// 	method:"get",
			// 		// 	headers: {"x-access-header": data.token},
			// 		// 	success:function(result){
			// 		// 		console.log(result);
			// 		// 		sessionStorage.setItem('userDetails', JSON.stringify(result));
			// 		// 	}
			// 		// .................................>>>>>>>>>>>>>})

			// 		//var obj = JSON.parse(sessionStorage.getItem('userDetails'));
			// 		// window.location.assign("../#/generalInfoSkill");
			// 	}
			// }
		});
	
	
})(window, jQuery);
/*window.onload = function () {
	SKILL.skillSuperviser.createDom();
}*/