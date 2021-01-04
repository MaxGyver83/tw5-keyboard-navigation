# tw5-keyboard-navigation
Navigate through your TiddlyWiki5 with your keyboard: jump to next/previous tiddler, edit, close, and more.

Any actions that can be performed by the view toolbar buttons can be performed with keybinds using this plugin.

## Demonstration/Installation
Check [this demonstration](https://maximilian-schillinger.de/tw5-keyboard-navigation-plugin.html) of tw-keyboard-navigation! You can integrate `tw5-keyboard-navigation` by dragging the plugin tiddler from the demo page into your TiddlyWiki.

## How to use
Press `Esc` to unfocus the sidebar search field.
Then you can jump to the next or previous open tiddler in the story river by pressing `j` or `k`, respectively.
Press `e` if you want to edit the current tiddler. Press `Ctrl+Return` when you're done (as usual).
`c` is for closing a tiddler.

When you search your TiddlyWiki (`Ctrl+Shift+f` by default), just press `Return` to open or `Tab` to focus the first match (without this plugin you have to press `Tab` four times). UPDATE: Since TW 5.1.23 you can focus the first match with the down arrow key (without this plugin).

## Adding / Changing keybinds
You can bind keys to any of the tiddler buttons (permalink, export, fold, info, etc). Here is how you do it:
1. Install this plugin
2. Refresh and find it in your Plugins tab in ControlPanel
3. Open the tiddler `keyboard-navigation.js`
4. Near the top just edit the `bindings` variable for more functionality, or the `navigate_up_key` and `navigate_down_key` to change the keys used for navigation

## Note on button functionality
Your keybinds will only work when you have the corresponding buttons enabled in `Appearance` → `Toolbars` → `View Toolbar`. Otherwise, you have to press first `m` for opening the "More actions" dropdown menu and then, with the close button visible, `c` for closing the tiddler (for example).

This is because this functionality works by using the DOM elements (the toolbar buttons), so if you remove them, they can't be "clicked" by this plugin.
