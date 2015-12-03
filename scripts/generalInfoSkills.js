/**
 * @project SKILL Tool
 * @name    generalInfoSkills JS file
 * @author  akatoch@sapient.com
 
 * @description- this module displays rating of supervisee
 */
var SKILL = SKILL || {};



SKILL.skills = function() {
	'use strict';
	var cancel,
		submit,
		editable,
		skillsTemplate = SKILL.Constants.constantKey.SKILLS_TEMPLATE,
		mainContainer = SKILL.Constants.constantKey.MAIN_CONTAINER,
		editButton = SKILL.Constants.constantKey.EDIT,
		hideSkill = SKILL.Constants.constantKey.HIDE_SKILL,
		displaySkill = SKILL.Constants.constantKey.DISPLAY_SKILL,
		hide = SKILL.Constants.constantKey.HIDE,
		showTable = SKILL.Constants.constantKey.SHOW_ACCORDION,
		hideTable = SKILL.Constants.constantKey.HIDE_ACCORDION,
		table = SKILL.Constants.constantKey.TABLE,
		scroll = SKILL.Constants.constantKey.SCROLL,
		click = SKILL.Constants.constantKey.CLICK,
		statusButton = SKILL.Constants.constantKey.BUTTON,
		resetButton = SKILL.Constants.constantKey.RESET,
		skillTitle = SKILL.Constants.constantKey.SKILLS_HEADING,
		rating = SKILL.Constants.constantKey.RATING,
		curentRating = SKILL.Constants.constantKey.CURRENT_RATING,
		activeRow = SKILL.Constants.constantKey.ACTIVE_ROW,
		toggleIcons=SKILL.Constants.constantKey.TOGGLE_ICONS,
		toggleTable=SKILL.Constants.constantKey.TOGGLE_TABLE,
		formAction = SKILL.Constants.constantKey.FORM_BUTTON,
		selectBox = SKILL.Constants.constantKey.SELECT_BOX;


	/**
	 * @name createDom
	 * @params ()
	 *
	 * @description method gets called when we populate the page from login
	 *
	 * @returns {}
	 */
	var createDom = function() {
		$.ajax({
			url: SKILL.Config.serviceURLs.generalInfoSkillsService,
			type: 'GET',
			success: function(result) {
				skillTable(result);
				SKILL.header.info();
			},
			// error: function(xhr, ajaxOptions, thrownError) {
			// 	var errorCode = xhr.status;
			// 	SKILL.errorResponse(errorCode);
			// }
		});
	};
	/**
	 * @name skillTable
	 * @params json data from login services
	 *
	 * @description method gets called when we populate the page from login
	 *
	 * @returns {}
	 */
	var skillTable = function(data) {
		var theTemplateScript,
			theTemplate,
			theCompiledHtml,
			edit;
		theTemplateScript = $('#' + skillsTemplate).html();
		theTemplate = Handlebars.compile(theTemplateScript);
		// Pass our data to the templates
		theCompiledHtml = theTemplate(data);
		$(mainContainer).html(theCompiledHtml);
		renderView();
		edit = $('.' + editButton);
		cancel = $(resetButton);
		submit = $('.' + statusButton);
		edit.on(click, editRating);
		cancel.on(click, cancelEdit);
		submit.on(click, submitForm);
	};
	/**
	 * @name renderView
	 * @params ()
	 *
	 * @description method gets called when we populate the page from login
	 *
	 * @returns {}
	 */
	var renderView = function() {
		var title;
		$('.' + hideSkill).first().addClass(displaySkill).removeClass(hideSkill);
		$('.' + showTable).first().addClass(hideTable).removeClass(showTable);
		$('.' + table).first().addClass(activeRow);
		$(scroll).mCustomScrollbar();
		/*Registering events*/
		title = $('.' + skillTitle);
		title.on(click, tableToggle);
	};
	/**
	 * @name tableToggle
	 * @params ()
	 *
	 * @description method gets called when we populate the page from login
	 *
	 * @returns {}
	 */
		// show and hide table on click
	var tableToggle = function() {
		var tableTitle = $(this).parent(),
			accordionNode = $(this).next(),
			openedTable = $('.' + displaySkill),
			icon = $(tableTitle).find('i').first();
		if (accordionNode.is('.' + hideSkill)) {
			if (openedTable) {
				openedTable.toggleClass(toggleTable);
				$('.' + hideTable).toggleClass(toggleIcons);
				$('.' + activeRow).removeClass(activeRow);
			}
		}
		$(tableTitle).toggleClass(activeRow);
		accordionNode.toggleClass(toggleTable);
		icon.toggleClass(toggleIcons);
	};
	/**
	 * @name editRating
	 * @params ()
	 *
	 * @description method gets called when we populate the page from login
	 *
	 * @returns {}
	 */

	var editRating = function() {
		$(this).addClass(hide);
		cancel.add(submit).removeClass(formAction);
		var originalRatings,
			originalRatings=$('.'+curentRating),
			entries = originalRatings.length,
			rnewRatings = $(selectBox);
			for (var index = 0; index < entries; index++){
				$(rnewRatings[index]).val($(originalRatings[index]).html());
			}
			editable = $('.' + rating);
			editable.toggleClass(hide);
	};
	/**
	 * @name cancelEdit
	 * @params ()
	 *
	 * @description method gets called when we populate the page from login
	 *
	 * @returns {}
	 */

	var cancelEdit = function() {
		cancel.add(submit).addClass(formAction);
		$('.' + editButton).removeClass(hide);
		editable.toggleClass(hide);
	};
	/**
	 * @name submitForm
	 * @params ()
	 *
	 * @description method gets called when we populate the page from login
	 *
	 * @returns {}
	 */

	var submitForm = function() {
		var originalRatings=$('.'+curentRating),
			entries = originalRatings.length,
			rnewRatings = $(selectBox),
			submitRatings={};
			cancelEdit();
			for (var index = 0; index < entries; index++){
				$(originalRatings[index]).html(rnewRatings[index].value);
				submitRatings[$(rnewRatings[index]).attr('id')]=rnewRatings[index].value;
			}
			$.ajax({
				url: SKILL.Config.serviceURLs.generalInfoSkillsService,
				method: 'get',
				data:submitRatings 
			});
	};
	/**
	 * @name return block
	 * @params ()
	 *
	 * @description method to return the various modules
	 *
	 * @returns {createDom, renderView}
	 */
	return {
		createDom: createDom,
		renderView: renderView
	};
}(window, jQuery);
window.onload = function() {
	'use strict';
	if (sessionStorage.login){
		SKILL.skills.createDom();
	}
	else{
		$(location).attr('href', '../login.html');
	}
};