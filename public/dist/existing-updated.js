"use strict";

var getReadableStringMatch = function(type) {
	switch (type) {
		case "equals":
			return "equals ";
		case "not_equals":
			return "does not equal ";
		case "contains":
			return "contains ";
		case "not_contains":
			return "does not contain ";
		case "regex":
			return "RegExp matches ";
		case "greater":
			return "greater than ";
		case "less":
			return "less than ";
		default:
			break;
	}
};

var RegisteredSegmentRules = [
	/** Advanced **/
	{
		group: "Advanced",
		type: "JavascriptFn",
		label: "Evaluate Javascript",
		view: "JavascriptParameterView",
		getReadable: function(formParameters) {
			return "Javascript evaluates to TRUE";
		},
		getIsMatch: function(env) {},
	},
	/** User Interaction **/
	{
		group: "User Interaction",
		type: "UserClickAd",
		label: "Clicks Ad",
		paramLabel: "Search URL For (Optional)",
		matchType: "stringMatch",
		view: "ClicksAdView",
		paramOptional: true,
		getReadable: function(formParameters) {
			var label = [];
			if (formParameters.param) {
				label.push("src " + getReadableStringMatch(formParameters.match_type) + " " + formParameters.param);
			}
			if (formParameters.paramHref) {
				label.push("href " + getReadableStringMatch(formParameters.match_type_href) + " " + formParameters.paramHref);
			}
			return "User clicks an on page ad where " + label.join(" and ");
		},
		getIsMatch: function(env) {},
	},
	/** Day/Time **/
	{
		group: "Day/Time",
		type: "DayOfWeek",
		label: "Day of Week",
		matchType: "equals",
		view: "DayOfWeekView",
		getReadable: function(formParameters) {
			var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			return "Day of week " + getReadableStringMatch(formParameters.match_type) + days[formParameters.param];
		},
		getIsMatch: function(env) {},
	}, {
		group: "Day/Time",
		type: "DayPart",
		label: "Time of Day",
		view: "DayPartView",
		getReadable: function(formParameters) {
			return "Time of day is between " + formParameters["t1"] + " and " + formParameters["t2"];
		},
		getIsMatch: function(env) {},
	},
	/** Content Engagement **/
	{
		group: "Content Engagement",
		type: "TimeOnPage",
		label: "Time on page",
		paramLabel: "Time (sec.)",
		matchType: "comparison",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "Time on page " + getReadableStringMatch(formParameters.match_type) + formParameters.param + " seconds";
		},
		getIsMatch: function(env) {},
	}, {
		group: "Content Engagement",
		type: "TimeOnSite",
		label: "Time on site",
		paramLabel: "Time (sec.)",
		matchType: "comparison",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "Time on site " + getReadableStringMatch(formParameters.match_type) + formParameters.param + " seconds";
		},
		getIsMatch: function(env) {},
	}, {
		group: "Content Engagement",
		type: "PageDepth",
		label: "Page Depth",
		paramLabel: "# of Pages",
		matchType: "comparison",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "# of pages visited " + getReadableStringMatch(formParameters.match_type) + formParameters.param;
		},
		getIsMatch: function(env) {},
	},
	/** Page **/
	{
		group: "Page",
		type: "PageTitle",
		label: "Title",
		paramLabel: "Search Parameter",
		matchType: "stringMatch",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "Current page title  " + getReadableStringMatch(formParameters.match_type) + formParameters.param;
		},
		getIsMatch: function(env) {},
	}, {
		group: "Page",
		type: "PageContent",
		label: "Content",
		paramLabel: "Search Parameter",
		view: "PageContentView",
		getReadable: function(formParameters) {
			return "Current page content " + getReadableStringMatch(formParameters.match_type) + formParameters.param + " in selector " + formParameters["selector"];
		},
		getIsMatch: function(env) {},
	}, {
		group: "Page",
		type: "PageUrl",
		label: "Current URL",
		paramLabel: "Search Parameter",
		matchType: "stringMatch",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "Current page URL  " + getReadableStringMatch(formParameters.match_type) + formParameters.param;
		},
		getIsMatch: function(env) {},
	}, {
		group: "Page",
		type: "PageSource",
		label: "Source",
		paramLabel: "Search Parameter",
		matchType: "stringMatch",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "Current page source  " + getReadableStringMatch(formParameters.match_type) + formParameters.param;
		},
		getIsMatch: function(env) {},
	},
	/** User **/
	{
		group: "User",
		type: "UserSemcastList",
		label: "IP on Target List",
		view: "SemcastListView",
		getReadable: function(formParameters, options) {
			return "User's IP is on  " + options.getSemcastListName(formParameters.param);
		},
		getIsMatch: function(env) {},
	}, {
		group: "User",
		type: "UserGeoIPCountry",
		label: "GeoIP Country",
		paramLabel: "Country Code (xx)",
		matchType: "equals",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "User's country  " + getReadableStringMatch(formParameters.match_type) + formParameters.param;
		},
		getIsMatch: function(env) {},
	}, {
		group: "User",
		type: "UserGeoIPCity",
		label: "GeoIP City",
		paramLabel: "City Name (ex. Boston)",
		matchType: "equals",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "User's city  " + getReadableStringMatch(formParameters.match_type) + formParameters.param;
		},
		getIsMatch: function(env) {},
	}, {
		group: "User",
		type: "UserGeoIPDMA",
		label: "GeoIP DMA",
		paramLabel: "DMA Code",
		matchType: "equals",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "User's DMA code  " + getReadableStringMatch(formParameters.match_type) + formParameters.param;
		},
		getIsMatch: function(env) {},
	},
	/** Page Ad Tags **/
	{
		group: "Page Ad Tags",
		type: "DfpContains",
		label: "DFP Tag",
		paramLabel: "Search For",
		matchType: "contains",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "A DFP tag " + getReadableStringMatch(formParameters.match_type) + formParameters.param;
		},
		getIsMatch: function(env) {},
	}, {
		group: "Page Ad Tags",
		type: "UrlContains",
		label: "Tag URL",
		paramLabel: "Search For",
		matchType: "contains",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "An AD tag  " + getReadableStringMatch(formParameters.match_type) + formParameters.param;
		},
		getIsMatch: function(env) {},
	}, {
		group: "Page Ad Tags",
		type: "HrefContains",
		label: "Tag Href",
		paramLabel: "Search For",
		matchType: "contains",
		view: "SingleParameterView",
		getReadable: function(formParameters) {
			return "An AD tag href  " + getReadableStringMatch(formParameters.match_type) + formParameters.param;
		},
		getIsMatch: function(env) {},
	}
];

var SingleParameterView = Backbone.View.extend({
	paramsOptional: false,
	template: _.template(jQuery("#SingleParameterViewTemplate").html()),
	initialize: function(options) {
		this.rule = options.rule;
		this.segmentRule = options.segmentRule;
		this.vent = options.vent;
		this.render();
	},
	serialize: function(form) {
		return {
			param: $(form).find("[name='param']").val(),
			match_type: $(form).find("[name='match_type']").val(),
		}
	},
	isFormValid: function(form) {
		this.$el.find(".segment-form-error").hide();
		if (this.segmentRule.paramOptional && $(form).find("[name='param']").val().length == 0) {
			return true;
		}
		var isError = false;
		if ($(form).find("[name='param']").val().length == 0) {
			$(form).find("[name='param']").next(".segment-form-error").show();
			isError = true;
		}
		if (!$(form).find("[name='match_type']").val()) {
			$(form).find("[name='match_type']").next(".segment-form-error").show();
			isError = true;
		}
		return !isError;
	},
	render: function() {
		var segmentRule = _.extend({
			paramOptional: false
		}, this.segmentRule);
		this.$el.html(this.template({
			segmentRule: segmentRule,
			rule: this.rule
		}));
	}
});

var PageContentView = SingleParameterView.extend({
	template: _.template(jQuery("#PageContentViewTemplate").html()),
	serialize: function(form) {
		return {
			param: $(form).find("[name='param']").val(),
			match_type: $(form).find("[name='match_type']").val(),
			selector: $(form).find("[name='selector']").val(),
		}
	},
	isFormValid: function(form) {
		this.$el.find(".segment-form-error").hide();
		var isError = false;
		if ($(form).find("[name='selector']").val().length == 0) {
			$(form).find("[name='selector']").next(".segment-form-error").show();
			isError = true;
		}
		if ($(form).find("[name='param']").val().length == 0) {
			$(form).find("[name='param']").next(".segment-form-error").show();
			isError = true;
		}
		if (!$(form).find("[name='match_type']").val()) {
			$(form).find("[name='match_type']").next(".segment-form-error").show();
			isError = true;
		}
		return !isError;
	},
});

var DayPartView = SingleParameterView.extend({
	template: _.template(jQuery("#DayPartViewTemplate").html()),
	serialize: function(form) {
		return {
			t1: $(form).find("[name='t1']").val(),
			t2: $(form).find("[name='t2']").val(),
		}
	},
	isFormValid: function(form) {
		this.$el.find(".segment-form-error").hide();
		var isError = false;
		if ($(form).find("[name='t1']").val().length == 0) {
			$(form).find("[name='t1']").next(".segment-form-error").show();
			isError = true;
		}
		if ($(form).find("[name='t2']").val().length == 0) {
			$(form).find("[name='t2']").next(".segment-form-error").show();
			isError = true;
		}
		return !isError;
	},
});

var SemcastListView = SingleParameterView.extend({
	template: _.template(jQuery("#SemcastListViewTemplate").html()),
});

var DayOfWeekView = SingleParameterView.extend({
	template: _.template(jQuery("#DayOfWeekViewTemplate").html()),
});

var JavascriptParameterView = SingleParameterView.extend({
	template: _.template(jQuery("#JavascriptViewTemplate").html()),
});

var ClicksAdView = SingleParameterView.extend({
	template: _.template(jQuery("#ClicksAdViewTemplate").html()),
	serialize: function(form) {
		return {
			param: $(form).find("[name='param']").val(),
			match_type: $(form).find("[name='match_type']").val(),
			paramHref: $(form).find("[name='paramHref']").val(),
			match_type_href: $(form).find("[name='match_type_href']").val(),
		}
	}
});

var AddEditRuleView = Backbone.View.extend({
	template: _.template(jQuery("#AddEditViewTemplate").html()),
	selectOptions: {},
	initialize: function(options) {
		this.vent = options.vent;
		this.selectOptions = options.selectOptions;
		this.rule = options.rule;
		this.pos = options.pos;
		this.render();
		if (this.rule.type) {
			this.onRuleTypeChange(this.rule.type);
		}
	},
	render: function() {
		this.$el.html(this.template({
			selectOptions: this.selectOptions,
			rule: this.rule
		}));
	},
	onRuleTypeChange: function(type) {
		var segmentRule = _.findWhere(RegisteredSegmentRules, {
			type: type
		});
		var viewOptions = {
			el: this.$el.find("[data-provide='parameter-target']"),
			vent: this.vent,
			segmentRule: segmentRule,
			rule: this.rule
		};
		this.activeRuleView = new window[segmentRule.view](viewOptions);
	},
	events: {
		"click [type='reset']": function(e) {
			this.vent.trigger("AddEditRuleView:cancel");
		},
		"change [data-provide='rule-type']": function(e) {
			if ($(e.currentTarget).val() == 'JavascriptFn') alert("WARNING:  Use the Evaluate Javascript rule with extreme caution as invalid javascript entered could cause the pixel to throw javascript errors on load.")
			this.onRuleTypeChange($(e.currentTarget).val());
		},
		"submit form": function(e) {
			var isValid = this.activeRuleView.isFormValid($(e.currentTarget));
			if (!isValid) {
				return false;
			}
			var serializedForm = _.extend({
				type: this.$el.find("[data-provide='rule-type']").val(),
				pos: this.pos
			}, {
				formParameters: this.activeRuleView.serialize($(e.currentTarget))
			});
			this.vent.trigger("AddEditRuleView:save", serializedForm);
			return false;
		}
	}
});


var RulesetView = Backbone.View.extend({
	rulesetList: {
		matchType: "ALL",
		rulesets: []
	},
	template: _.template(jQuery("#RulesetViewTemplate").html()),
	selectOptions: {},
	semcastNamedLists: [],
	initialize: function(options) {
		var view = this;
		var groups = _.uniq(_.pluck(RegisteredSegmentRules, "group")).sort();
		_.each(groups, function(group) {
			view.selectOptions[group] = _.sortBy(_.where(RegisteredSegmentRules, {
				group: group
			}), "label");
		});
		this.semcastNamedLists = options.semcastNamedLists;
		this.saveUrl = options.saveUrl;
		if (options.currentRules) {
			this.rulesetList = options.currentRules;
		}
		this.vent = _.extend({}, Backbone.Events);
		_.bindAll(this, "closeRuleForm", "saveRuleForm", "getReadableView", "getSemcastListName");
		this.vent.on("AddEditRuleView:cancel", this.closeRuleForm);
		this.vent.on("AddEditRuleView:save", this.saveRuleForm);
		this.render();
	},
	saveRuleForm: function(e) {
		var rule = _.omit(e, "pos");
		if (e.pos.length == 1) {
			this.rulesetList.rulesets[e.pos[0]].rules.push(rule);
		} else {
			this.rulesetList.rulesets[e.pos[0]].rules[e.pos[1]] = rule;
		}
		this.render();
	},
	closeRuleForm: function(e) {
		this.$el.find("#addEditRuleTarget").html("");
	},
	getSemcastListName: function(id) {
		var list = _.findWhere(this.semcastNamedLists, {
			id: parseInt(id)
		});
		return list ? list.name + " (" + list.list_size + " IPs)" : "N/A";
	},
	getReadableView: function(rule) {
		var segmentRule = _.findWhere(RegisteredSegmentRules, {
			type: rule.type
		});
		return segmentRule.getReadable(rule.formParameters, {
			getSemcastListName: this.getSemcastListName
		});
	},
	render: function() {
		this.$el.find("#ruleset-edit-target").html(this.template({
			rulesetList: this.rulesetList,
			getReadable: this.getReadableView
		}));
	},
	addEditRule: function(e) {
		var viewData = {
			selectOptions: this.selectOptions,
			el: this.$el.find("#addEditRuleTarget"),
			pos: null,
			innerIndex: null,
			rule: {
				type: null,
				formParameters: null
			},
			vent: this.vent
		}
		if ($(e.currentTarget).data("index")) {
			var pos = $(e.currentTarget).data("index").split(",");
			var rule = this.rulesetList.rulesets[pos[0]].rules[pos[1]];
			viewData = _.extend(viewData, {
				pos: pos,
				rule: rule
			});
		} else {
			var index = $(e.currentTarget).parents("tr:first").data("index");
			viewData = _.extend(viewData, {
				pos: [index]
			});
		}
		var addRuleView = new AddEditRuleView(viewData);
		return false;
	},
	events: {
		"click [data-provide='edit-rule']": "addEditRule",
		"click [data-provide='add-rule']": "addEditRule",
		"change #any-all": function(e) {
			this.rulesetList["matchType"] = (!$(e.currentTarget).is(':checked')) ? 'ALL' : 'ANY';
			this.render();
			return false;
		},
		"click [data-provide='toggle-match-type']": function(e) {
			var index = $(e.currentTarget).parents("tr:first").data("index");
			this.rulesetList.rulesets[index]["matchType"] = $(e.currentTarget).data("match-type") == "ALL" ? "ANY" : "ALL";
			this.render();
			return false;
		},
		"click [data-provide='add-ruleset']": function(e) {
			this.rulesetList.rulesets.push({
				matchType: "ALL",
				rules: []
			});
			this.render();
			return false;
		},
		"click [data-provide='remove-rule']": function(e) {
			if (!confirm("Are you sure?")) {
				return false;
			}
			var pos = $(e.currentTarget).data("index").split(",");
			this.rulesetList.rulesets[pos[0]].rules = _.filter(this.rulesetList.rulesets[pos[0]].rules, function(el, i) {
				return i != pos[1];
			});
			this.render();
			return false;
		},
		"click [data-provide='remove-rule-ruleset']": function(e) {
			if (!confirm("Are you sure?")) {
				return false;
			}
			var index = $(e.currentTarget).parents("tr:first").data("index");
			this.rulesetList.rulesets = _.filter(this.rulesetList.rulesets, function(el, i) {
				return i != index;
			});
			this.render();
			return false;
		},
		"click #dpm_audiencebundle_customsegment_isBackend": function(e) {
			var form = $("#editSegmentForm");
			var imgPixelTextArea = form.find("#imagePixel");
			if (imgPixelTextArea.hasClass("hidden")) {
				imgPixelTextArea.removeClass("hidden");
				$("#noRulesMsg").removeClass("hidden");
				$("#rulesContainer").addClass("hidden");
			} else {
				$("#noRulesMsg").addClass("hidden");
				$("#rulesContainer").removeClass("hidden");
				imgPixelTextArea.addClass("hidden");
			}
		},
		"submit #editSegmentForm": function(e) {
			this.$el.find("#dpm_audiencebundle_customsegment_jsExpression").val(JSON.stringify(this.rulesetList));
			var view = this;
			var form = $(e.currentTarget);
			view.$el.find("[data-provide='form-success']").hide();
			$(".loader").show();
			$.post(this.saveUrl, form.serialize(), function(result) {
				if (!result.isError) {
					form.find("[name='id']").val(result.id);
					var imgPixelTextArea = form.find("#imagePixel");
					if (result.isBackend) imgPixelTextArea.text('&lt;img src="http://ib.adnxs.com/seg?add=' + result.id + '" width="1" height="1"/&gt').show();
					else imgPixelTextArea.hide();
					var successEl = view.$el.find("[data-provide='form-success']");
					successEl.show();
					var url = window.location.href.replace("/new", "/edit/" + result.id);
					if (result.goToList) {
						window.location = url.replace(/(\/edit\/\d+)/g, "");
						return false;
					} else if (result.addAnother) {
						window.location = url.replace(/(\/edit\/\d+)/g, "/new");
						return false;
					} else {
						window.history.replaceState(null, "Edit " + result.name, url);
					}
					var updateUrl = $('#updatePixelBanner').data("url");
					if (updateUrl.indexOf("segment/0") > 0) {
						$('#updatePixelBanner').data("url", updateUrl.replace("segment/0", "segment/" + result.id));
					}
					if (result.showManualSegmentUpdate) {
						$('#updatePixelBanner').removeClass("hidden");
					}
					$("#pageHeader").html("Edit " + result.name);
					window.setTimeout(function() {
						successEl.hide();
					}, 3000);
				} else {
					alert(result.error);
				}
				$('.loader').hide();
				view.$el.find("#editSegmentFormInner").html(result.html);
				if (result.name) {
					if (result.name.indexOf("Copy-of-") != -1) $("#dpm_audiencebundle_customsegment_name").val('').focus();
				}
			});
			return false;
		}
	}
});

$(document).ready(function() {
	var currentRules = {
		"matchType": "ANY",
		"rulesets": [{
			"matchType": "ALL",
			"rules": [{
				"type": "TimeOnSite",
				"formParameters": {
					"param": "30",
					"match_type": "greater"
				}
			}, {
				"type": "PageUrl",
				"formParameters": {
					"param": "webhostingtalk.com",
					"match_type": "contains"
				}
			}]
		}]
	};
	var semcastNamedLists = [{
		"name": "Gatehouse Office",
		"id": "3",
		"list_size": "1"
	}, {
		"name": "TTGT 20141204",
		"id": "2",
		"list_size": "0"
	}, {
		"name": "TTGT B2B",
		"id": "1",
		"list_size": "0"
	}];
	var saveUrl = "https://clients.audience360.com/segment/save-expression";
	var ruleView = new RulesetView({
		el: $("#rulesetEditForm"),
		currentRules: currentRules,
		semcastNamedLists: semcastNamedLists,
		saveUrl: saveUrl
	});
	$("#copyToNewSegment").on("click", function() {
		saveUrl += "?copySegmentId=9658";
		ruleView.saveUrl = saveUrl;
		validateAndSubmitForm();
		return false;
	});
	$(".go-to-list").on("click", function() {
		saveUrl += "?goToList=1";
		ruleView.saveUrl = saveUrl;
		validateAndSubmitForm();
		return false;
	});
	$(".add-another").on("click", function() {
		saveUrl += "?addAnother=1";
		ruleView.saveUrl = saveUrl;
		validateAndSubmitForm();
		return false;
	});

	function validateAndSubmitForm() {
		var errArr = [];
		$('#editSegmentForm input[type="text"], #editSegmentForm select').each(function() {
			if ($(this).attr('required') == 'required' && $(this).val() === '') {
				errArr.push($(this).prev().text());
			}
		});
		if (errArr.length) {
			alert('You are missing required field(s): ' + errArr.join(','));
			resetSaveUrl();
			return false;
		}
		$('#editSegmentForm').submit();
		resetSaveUrl();
	}

	function resetSaveUrl() {
		saveUrl = "https://clients.audience360.com/segment/save-expression";
		ruleView.saveUrl = saveUrl;
	}
	if ($("#dpm_audiencebundle_customsegment_expireDays").val() == -10) {
		$("#dpm_audiencebundle_customsegment_customExpireDays").parent().show();
	} else {
		$("#dpm_audiencebundle_customsegment_customExpireDays").parent().hide();
	}

	$("#dpm_audiencebundle_customsegment_customExpireDays").keydown(function(e) {
		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});

	$("form").on("change", "#dpm_audiencebundle_customsegment_expireDays", function() {
		if ($(this).val() == -10) {
			$("#dpm_audiencebundle_customsegment_customExpireDays").parent().show();
		} else {
			$("#dpm_audiencebundle_customsegment_customExpireDays").val("").parent().hide();
		}
		return false;
	});

	$("form").on("click", "[data-provide='toggle-advanced']", function() {
		var span = $(this).find("span:first");
		if (span.hasClass("glyphicon-chevron-down")) {
			span.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
			$("[data-provide='advanced-options']").slideDown();
		} else {
			span.addClass("glyphicon-chevron-down").removeClass("glyphicon-chevron-up");
			$("[data-provide='advanced-options']").slideUp();
		}
		return false;
	});

	if ($("#dpm_audiencebundle_customsegment_additionalImageUrlsToLoad").length || $("#dpm_audiencebundle_customsegment_additionalJavascriptUrlsToLoad").length || $("#dpm_audiencebundle_customsegment_additionalHtmlToLoad").length) {
		$("[data-provide='toggle-advanced']").click();
	}
	
	$('#updatePixelBanner button').on('click', function() {
		var update_url = $('#updatePixelBanner').data("url");
		var answer = confirm("Do you really want to update your live production pixel?");
		if (answer) {
			$(this).find('span').hide();
			$(this).find('img').show();
			$.get(update_url).done(function(data) {
				var pixelBannerSel = $('#updatePixelBanner');
				if (data == 'success') {
					pixelBannerSel.find('button img').hide();
					pixelBannerSel.hide();
					//$('#invalidationStatus').show();
				} else {
					pixelBannerSel.find('button span').show();
					pixelBannerSel.find('button img').hide();
					alert('There was a problem updating your pixel, please notify support through Help > Support form.');
				}
			});
		}
		return false;
	});
});

