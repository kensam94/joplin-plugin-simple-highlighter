import { Editor } from "codemirror";

module.exports = {
	default: function(_context: any) {

        const htmlWrapper = `<span style="background:colorCode;">text</span>`

		const plugin = function(CodeMirror) {

			/**
			 * Joplin command to format the table
			 */
			CodeMirror.defineExtension('highlight', function() {
				const cm: Editor = this;
                
                var selectedText = cm.getSelection();
                var replaceText = htmlWrapper.replace("colorCode", "#ff8b8b").replace("text", selectedText);
                cm.replaceSelection(replaceText);
                cm.refresh();
            });
		}

		return {
			plugin: plugin,
        }
    }
}