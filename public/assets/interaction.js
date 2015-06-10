/**
 * Segment UI
 */
'use strict';

(function ($) {

	// options
	var transTime = 150; // animation transitions duration

	// conditional criteria fields
	var $conditionalTrigger = $('[data-conditional-trigger]');
	if ($conditionalTrigger.length) {
		$(document).on('change', $conditionalTrigger.selector, function (e) {
			e.preventDefault();
			var val = $(this).val();
			var targets = '[data-display-if="' + val + '"]';
			var $parent = $(this).parents('.ruleset');
			var $specificConditionalFields = $parent.find(targets);

			$parent.find('[data-display-if]').fadeOut(transTime);
			if ($specificConditionalFields.length && $specificConditionalFields.not(':visible')) {
				$specificConditionalFields.fadeIn(transTime);
			}
		});
	}

	// remove rules
	var $remove = $('[data-segment-action="remove"]');
	if ($remove.length) {
		$(document).on('click', $remove.selector, function (e) {
			e.preventDefault();

			var $target = $(this).parents('.ruleset');
			var id = $target.data('id');

			$target.add('[data-parent="' + id + '"]').fadeOut(transTime, function () {
				$(this).remove();
			});
		});
	}

	// add rules
	var $add = $('[data-segment-action="add"]');
	if ($add.length) {
		$(document).on('click', $add.selector, function (e) {
			e.preventDefault();

			var operator = $(this).data('segment-operator');
			var $target = $(this).parents('.ruleset, .add-ruleset');
			var $clone = $('#ruleset-clone-' + operator).clone().removeAttr('id').addClass('cloned');
			var id;

			if (operator === 'or') {
				id = $('.ruleset.or').size();
				$clone.attr('data-id', id);
				$target.before($clone);
			}

			if (operator === 'and') {
				var parent = $target.data('id');
				var child = $('.ruleset.and[data-parent="' + parent + '"]').size() + 1;
				id = parent + '_' + child;
				$clone
					.attr('data-id', id)
					.attr('data-parent', parent);
				$target.after($clone);
			}

			$('.ruleset.cloned').fadeIn(transTime).removeClass('cloned');
		});
	}

})(window.jQuery);