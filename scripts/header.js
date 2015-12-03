/* ==========================================================================
@project SKILL Tool
@name    header JS file
@author  akatoch@sapient.com
 
@description- Header JS 
========================================================================== */
/*global SKILL, sessionStorage */
'use strict';
//SKILL.Header = {};
//function to toggle submenu
SKILL.header=function(window,$){
	var  headerSubmenu;

	var submenu = function(event) {
		headerSubmenu = $('#headerSubmenu');
		$(this).find('.fa').toggleClass('fa-chevron-down fa-chevron-up');
		SKILL.isSubmenuClicked = true;
		headerSubmenu.toggleClass('show hide');
	};

	//function to toggle notification menu

	var showNotificationMenu = function(event) {
		var  notificationMenu;
		notificationMenu= $('#notificationMenu');
		SKILL.isNotificationClicked = true;
		notificationMenu.toggleClass('show hide');
	};


	//function to clear session on logout

	// var logout = function() {
	// 	console.log("hsdk");
	// 	$(location).attr('href', '../login.html');
	// 	sessionStorage.clear();

	// };


	//function to redirect the page when clicked on notification

	var pageScroll=function(oracleId) {
		SKILL.skillSuperviser.createDom();
		$.getJSON('../scripts/mockJSON/superviseeList.json', function(data) {
			var  index,
			len = data.length,
			key,
			found = false;
			for (index = 0; index < len && found === false; index++) {
				for (key in data[index]) {
					if (key === 'oracle_id' && data[index][key] === oracleId) {
						found = true;
						index--;
						break;
					}
				}
			}
			showSuperviseeInfo(data[index]);
		});
	};


	var showSuperviseeInfo = function(data) {
		var  profileInfo,
		theTemplateScript,
		theTemplateScript,
		theTemplate,
		theCompiledHtml;
		profileInfo = $('#profileInfo');
		if (profileInfo) {
			profileInfo.remove();
		}
		theTemplateScript = $('#headerSuperviseeInfo').html(),
		theTemplate = Handlebars.compile(theTemplateScript),
		theCompiledHtml = theTemplate(data);
		$('#headerContainer').append(theCompiledHtml);
	};



	var notify = function(data) {
		var  notification,
		theTemplateScript,
		theTemplate,
		theCompiledHtml;
		notification = $('#notificationMenu');
		theTemplateScript = $('#superviseeNotifications').html();
		theTemplate = Handlebars.compile(theTemplateScript);
		// Pass data to the template
		theCompiledHtml = theTemplate(data);
		notification.html(theCompiledHtml);
	};


	var info = function() {
		var  notification,
		userDetails,
		mainMenu,
		menu;
		userDetails = JSON.parse(sessionStorage.getItem('userInformation'));
		mainMenu = $('.sub-menu');
		menu = $('.menu');
		generateHeader(userDetails);
	


		//function to generate header from template

		function  generateHeader (userDetails) {
			var  theTemplateScript ,
			theTemplate,
			theCompiledHtml,
			userInfo,
			logoutNode;
			console.log(logoutNode,"LOG");
			theTemplateScript= $('#headerTpl').html();
			theTemplate = Handlebars.compile(theTemplateScript);
			// Pass data to the template
			theCompiledHtml = theTemplate(userDetails);
			$('#headerContainer').html(theCompiledHtml);
			userInfo = $('#userInfo');
			notification = $('#notification');

			userInfo.on('click',submenu);

			$(document).on('click', function(event) {
				if (SKILL.isSubmenuClicked === false) {
						headerSubmenu = $('#headerSubmenu');
					if (headerSubmenu.hasClass('show')) {
						headerSubmenu.removeClass('show').addClass('hide');
					}

				}
				if (SKILL.isNotificationClicked === false) {
						//headerSubmenu = $('#headerSubmenu');.....................................................
					if (notification.hasClass('show')) {
						notification.removeClass('show').addClass('hide');
					}
				}
				SKILL.isSubmenuClicked = false;
				SKILL.isNotificationClicked = false;
			});
			logoutNode = $('#logout');
			//function to clear session on logout
			logoutNode.on('click', function(){

		$(location).attr('href', '../login.html');
		sessionStorage.clear();
			});
			if (notification) {
				notification.on('click', showNotificationMenu);
				$.getJSON('../scripts/mockJSON/superviseeList.json', notify);
			}

			$('h1').on('click',function(){
				$(location).attr('href', '../index.html');
			});

			SKILL.isSubmenuClicked = false;
			SKILL.isNotificationClicked = false;
		});
			//$('.userInfo').on('click',function(){
				//console.log("heklloo");
				//$('this').find('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
			//});
			
			
		
	}
	};
	return {
		info:info,
		pageScroll:pageScroll
	};
}(window, jQuery);