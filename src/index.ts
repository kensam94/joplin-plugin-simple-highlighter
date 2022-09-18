import joplin from 'api';
import { ContentScriptType, MenuItemLocation, ToolbarButtonLocation } from 'api/types';

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
		// joplin.views.menuItems.create("Highlight Context", "highlight", MenuItemLocation.EditorContextMenu);
	},
});
