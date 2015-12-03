/* ==========================================================================
@project SKILL Tool
@name    config JS file
@author  akatoch@sapient.com
 
@description- config  JS file
========================================================================== */
// Declaring namespace parameter

var SKILL = SKILL || {};

/**
 * @name config
 * @params window
 *@author  akatoch@sapient.com
 * @description method consists of general configurations of application
 *
 * @returns serviceURLS and method
 */

SKILL.Config = function(window) {
	'use strict';
	var method = 'GET';
	var serviceURLs = {};
	serviceURLs.api = 'https://api.myjson.com/bins/';
	//runningServiceURLs.api = 'http://10.207.5.225:5353/';
	//serviceURLs.loginService = serviceURLs.api + '3p8fi';
	serviceURLs.newloginService ='http://studioauth.sapient.com/apiv1/authenticate';
	// serviceURLs.peopleListingService = serviceURLs.api + '2cdha';
	//var newloginService=serviceURLs+"http://studioauth.sapient.com/apiv1/authenticate";
	serviceURLs.generalInfoSkillsService = serviceURLs.api + '4pw6m';

	serviceURLs.permission="http://10.207.5.225:5353/auth/getpermissions";

	//serviceURLs.userInfo=runningServiceURLs.api+ 'auth/getpermissions';
	return {
		serviceURLs: serviceURLs,
		method: method
	};
}(window);