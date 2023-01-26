import joplin from 'api';
import { ContentScriptType, ToolbarButtonLocation } from 'api/types';

joplin.plugins.register({
	onStart: async function() {
		joplin.contentScripts.register(ContentScriptType.CodeMirrorPlugin, "Highlighter", "./highlighter.js");

		joplin.commands.register({
			name: 'highlight',
			label: 'Highlight',
			iconName: "fas fa-highlighter",
			execute: async () => {
				await joplin.commands.execute('editor.execCommand', { name: 'highlight', });
			}
		});

		joplin.views.toolbarButtons.create("highlight", "highlight", ToolbarButtonLocation.EditorToolbar);
		// Add a menu entry, allowing the ability to assign a keyboard shortcut
		joplin.views.menuItems.create('highlight', 'highlight', MenuItemLocation.Edit, { accelerator: 'CmdOrCtrl+H' });
	},
});
