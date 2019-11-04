(function () {

/*jslint node: false, browser: true */
/*global $tw: false */
"use strict";

exports.name = "tw5-keyboard-navigation"; exports.after = ["rootwidget"];

exports.startup = function () {

// unselect search box on startup
var activeElement = document.activeElement;
activeElement.blur();

const SMOOTH_SCROLLING = false;
const MARK_CURRENT_TIDDLER = true;
// tiddler's top position should be +/- LIMIT pixels in order to be considered the topmost
const LIMIT = 50;

var tiddler_index = -1;


function isInViewport(el) {
	var rect = el.getBoundingClientRect();
	return (
		rect.bottom > 0 &&
		rect.top < (window.innerHeight || document.documentElement.clientHeight)
	);
}


function isElementCloseToTop(el) {
	var rect = el.getBoundingClientRect();
	return (rect.top >= -LIMIT && rect.top <= LIMIT);
}


function findTopmostTiddler(tiddlers) {
	var i = 0;
	while (i < tiddlers.length && tiddlers[i].getBoundingClientRect().top <= -LIMIT) {
		i++;
	}
	return i;
}


document.onkeyup = function(e) {
	if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;

	var activeElement = document.activeElement;
	if (activeElement && activeElement.tagName.toLowerCase() == "textarea") return;
	if (activeElement && activeElement.tagName.toLowerCase() == "input") {
		if (e.code == "Escape") {
			// unfocus search box
			activeElement.blur();
			//window.focus();
		}
		return;
	}

	var tiddlers = document.getElementsByClassName('tc-tiddler-frame');
	if (tiddlers.length == 0) return;

	var last_tiddler_index = tiddler_index;
	if (e.code == "KeyJ" || e.code == "KeyK") {
		if (tiddler_index < 0 || (!isInViewport(tiddlers[tiddler_index]) && !isElementCloseToTop(tiddlers[tiddler_index]))) {
			tiddler_index = findTopmostTiddler(tiddlers);
			if (e.code == "KeyJ") tiddler_index -= 1;
		}
		if (e.code == "KeyJ") {
			// go down
			tiddler_index += 1;
			if (tiddler_index >= tiddlers.length) tiddler_index = 0;
		} else  {  // e.code == "KeyK"
			// go up
			tiddler_index -= 1;
			if (tiddler_index < 0) tiddler_index = tiddlers.length - 1;
		}
		if (SMOOTH_SCROLLING)
			tiddlers[tiddler_index].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
		else
			tiddlers[tiddler_index].scrollIntoView();
		if (MARK_CURRENT_TIDDLER) {
			if (last_tiddler_index >= 0)
				tiddlers[last_tiddler_index].classList.remove("activeTiddler");
			tiddlers[tiddler_index].classList.add("activeTiddler");
		}
	} else if (e.code == "KeyC") {
		// close current tiddler
		if (tiddler_index < 0) return;
		if (!isInViewport(tiddlers[tiddler_index])) return;
		var button = tiddlers[tiddler_index].getElementsByClassName('tc-btn-%24%3A%2Fcore%2Fui%2FButtons%2Fclose')[0];
		button.click();
        if (tiddlers.length == 1) return;  // no tiddler left (after closing the last one)
		if (tiddler_index >= tiddlers.length - 1) tiddler_index = tiddlers.length-2;
		if (MARK_CURRENT_TIDDLER)
			tiddlers[tiddler_index].classList.add("activeTiddler");
    } else if (e.code == "KeyE" && e.key != "ArrowUp") {
		// check for ArrowUp because AltGr+E is ArrowUp in Neo2, AdNW, KOY and other keyboard layouts
		// edit current tiddler
		tiddler_index = findTopmostTiddler(tiddlers);
		var button = tiddlers[tiddler_index].getElementsByClassName('tc-btn-%24%3A%2Fcore%2Fui%2FButtons%2Fedit')[0];
		button.click();
	}
};

}

})();
