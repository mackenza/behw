define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        Menus          = brackets.getModule("command/Menus");

    var __dirname = ExtensionUtils.getModulePath(module);
    var fs = node.require('fs');
    var path = node.require('path');
    var theText = fs.readFileSync(path.resolve(__dirname, 'hello-world.txt'), "utf8");
    console.log("behw", "theText", theText);

    // Function to run when the menu item is clicked
    function handleHelloWorld() {
        var editor = EditorManager.getFocusedEditor();
        if (editor) {
            var insertionPos = editor.getCursorPos();
            editor.document.replaceRange(theText, insertionPos);
        }
    }

    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "helloworld.writehello";   // package-style naming to avoid collisions
    CommandManager.register("Hello World 2", MY_COMMAND_ID, handleHelloWorld);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(MY_COMMAND_ID);
});
