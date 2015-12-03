/**
 * @project SKILL Tool
 * @name    SupervisorView JS file
 * @author  akatoch@sapient.com
 
 * @description- this module displays superviser view
 */
var SKILL = SKILL || {};
SKILL.skillSuperviser = function(window, $) {
	'use strict';
	var cancel,
		submit,
		editable,
		statusValue,
		parent,
		superviser = SKILL.Constants.constantKey.SKILL_SUPERVISER,
		mainContainer = SKILL.Constants.constantKey.MAIN_CONTAINER,
		click = SKILL.Constants.constantKey.CLICK,
		languageTitle = SKILL.Constants.constantKey.ROW,
		statusButton = SKILL.Constants.constantKey.BUTTON,
		comments = SKILL.Constants.constantKey.COMMENTS,
		disabledState = SKILL.Constants.constantKey.DISABLED,
		reason = SKILL.Constants.constantKey.TEXTAREA;
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
			success: function(result) {
				skillTable(result);
			}
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
			theCompiledHtml;
		theTemplateScript = $('#' + superviser).html();
		theTemplate = Handlebars.compile(theTemplateScript);
		// Pass our data to the template
		theCompiledHtml = theTemplate(data);
		$(mainContainer).html(theCompiledHtml);
		SKILL.skills.renderView();
		$('.' + languageTitle).on(click, '.' + statusButton, statusRating);
		$('.' + comments).on(click, '.' + statusButton, submitStatus);
		$('.' + comments).on(click, statusButton, cancelStatus);

	};
	/**
	 * @name statusRating
	 * @params ()
	 *
	 * @description method gets called when we populate the page from login
	 *
	 * @returns {}
	 */

	var statusRating = function() {
		var targetButton = $(this),
		targetParent = targetButton.closest('.' + languageTitle);
		statusValue = targetButton.val();
		targetParent.nextUntil('.' + languageTitle).slideDown(1000);
		targetButton.siblings('.' + statusButton).attr(disabledState, disabledState);

	};
	/**
	 * @name submitStatus
	 * @params ()
	 *
	 * @description method gets called when we populate the page from login
	 *
	 * @returns {}
	 */
	var submitStatus = function() {
		var targetButton = $(this),
			targetComment = targetButton.siblings(reason).val(),
			warning=targetButton.siblings('div');
		if (targetComment) {
			$.ajax({
				url: SKILL.Config.serviceURLs.generalInfoSkillsService,
				method: 'get',
				data: {
					status: statusValue,
					elaboration: targetComment
				}
			});
			completeAction(targetButton, true);
		} else {
			warning.removeClass('hide');
		}
	};
	/**
	 * @name cancelStatus
	 * @params ()
	 *
	 * @description method gets called when we populate the page from login
	 *
	 * @returns {}
	 */
	var cancelStatus = function() {
		var targetButton = $(this),
		warning=targetButton.siblings('div');
		completeAction(targetButton, false);
		warning.addClass('hide');
		targetButton.siblings(reason).val('');
	};
	/**
	 * @name completeAction
	 * @params ()
	 *
	 * @description method gets called when we populate the page from login
	 *
	 * @returns {}
	 */
	var completeAction = function(targetButton, disable) {
		var targetParent = targetButton.parent(),
			activeRow = targetParent.prevUntil('.' + comments);
		targetParent.slideUp(1000);
		activeRow.find('.' + statusButton).attr(disabledState, disable);
	};
	/**
	 * @name return block
	 * @params ()
	 *
	 * @description method to return the various modules
	 *
	 * @returns {createDom}
	 */
	return {
		createDom: createDom
	};
}(window, jQuery);