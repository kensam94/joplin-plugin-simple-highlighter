import { Editor } from "codemirror";
import CodeMirror = require("codemirror");

module.exports = {
	default: function(_context: any) {

        function movePosition (position: CodeMirror.Position, offset: number) : CodeMirror.Position {
            return {line: position.line, ch: position.ch + offset};
        }

		const plugin = function(CodeMirror) {
			CodeMirror.defineExtension('highlight', function() {
				const cm: Editor = this;
                const cursorFrom = cm.getCursor("from");
                const cursorTo = cm.getCursor("to");
                
                var selectedText = cm.getSelection();
                var surroundText = cm.getRange(movePosition(cursorFrom, -2), movePosition(cursorTo, 2))
                if (selectedText.startsWith("==") && selectedText.endsWith("==")) {
                    cm.replaceRange(selectedText.substring(2, selectedText.length - 2), cursorFrom, cursorTo);
                } else if (surroundText.startsWith("==") && surroundText.endsWith("==")) {
                    cm.replaceRange(selectedText, movePosition(cursorFrom, -2), movePosition(cursorTo, 2));
                } else {
                    var headOffset = /^(\s*)/.exec(selectedText)[1].length;
                    var tailOffset = /(\s*)$/.exec(selectedText)[1].length;
                    cm.replaceRange("==" + selectedText.trim() + "==", movePosition(cursorFrom, headOffset), movePosition(cursorTo, -tailOffset));
                }
                cm.focus();
                cm.refresh();
            });
		}

		return {
			plugin: plugin,
        }
    }
}