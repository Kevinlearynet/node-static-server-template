"use strict";!function($){var e=150,t=$("[data-conditional-trigger]");t.length&&$(document).on("change",t.selector,function(t){t.preventDefault();var n=$(this).val(),a='[data-display-if="'+n+'"]',r=$(this).parents(".ruleset"),o=r.find(a);r.find("[data-display-if]").fadeOut(e),o.length&&o.not(":visible")&&o.fadeIn(e)});var n=$('[data-segment-action="remove"]');n.length&&$(document).on("click",n.selector,function(t){t.preventDefault();var n=$(this).parents(".ruleset");n.fadeOut(e)});var a=$('[data-segment-action="add"]');a.length&&$(document).on("click",a.selector,function(t){t.preventDefault();var n=$(this).data("segment-operator"),a=$(this).parents(".ruleset, .add-ruleset"),r=$("#ruleset-clone-"+n).clone().removeAttr("id").addClass("cloned");"or"===n&&a.before(r),"and"===n&&a.after(r),$(".ruleset.cloned").fadeIn(e).removeClass("cloned")})}(window.jQuery);