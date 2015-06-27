/**
 * Segment UI
 */
'use strict';

(function ($, rv) {

	// options
	var $parent = $('#rulesetEditForm');

	// data binding
	rv.configure({
		adapter: {
			observe: function (obj, keypath, callback) {
				watch(obj, keypath, callback);
			},
			unobserve: function (obj, keypath, callback) {
				unwatch(obj, keypath, callback);
			},
			get: function (obj, keypath) {
				return obj[keypath];
			},
			set: function (obj, keypath, value) {
				obj[keypath] = value;
			}
		}
	});

	var data = {
		matchTypeAny: true,
		matchTypeAll: false,
		rules: [],
		formClass: 'ready',
		fields: {
			ruleType: [{
				name: 'Advanced',
				options: [{
					value: 'JavascriptFn',
					label: 'Evaluate Javascript'
				}]
			}, {
				name: 'Content Engagement',
				options: [{
					value: 'PageDepth',
					label: 'Page Depth'
				}, {
					value: 'TimeOnPage',
					label: 'Time on page'
				}]
			}]
		},
		handlers: {
			addParent: function (e, scope) {
				e.preventDefault();
				scope.data.rules.push({
					type: 'parent',
					id: data.rules.length,
					operator: (data.matchTypeAny) ? 'or' : 'and',
					children: []
				});
			},
			removeParent: function (e, scope) {
				e.preventDefault();
				scope.data.rules.splice(scope.index, 1);
			},
			addChild: function (e, scope) {
				e.preventDefault();
				scope.rule.children.push({
					type: 'child',
					operator: (data.matchTypeAny) ? 'or' : 'and'
				});
			},
			removeChild: function (e, scope) {
				e.preventDefault();
				scope.data.rules[scope.rule.id].children.splice(scope.index, 1);
			}
		}
	};

	// any/all switch field
	$('#any-all', $parent).switchButton({
		on_label: 'all',
		off_label: 'any',
		width: 50,
		height: 20,
		button_width: 25
	}).on('change', function () {
		var val = (!$(this).is(':checked')) ? 'all' : 'any';

		// logic: 'all'
		if (val === 'all') {
			data.matchTypeAny = true;
			data.matchTypeAll = false;
		} else {
			data.matchTypeAny = false;
			data.matchTypeAll = true;
		}
	});

	// bind data to dom
	rv.bind($parent, {
		data: data
	});

})(window.jQuery, window.rivets);