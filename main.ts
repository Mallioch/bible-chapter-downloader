import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting, Vault, DataWriteOptions } from 'obsidian';
import { stringify } from 'querystring';
import { TextSelectionModal, TextSelectionResult } from './src/text-selection-modal';
import { DataFetcher } from 'src/data-fetcher';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

interface ApiDataObject {
	verse: string
	text: string
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();


		const invokeDownloadDialog = () => {
			const callbackFunc = async (a: TextSelectionResult) => {
				const fileContents = await DataFetcher.getBook(a.bookId, a.chapterNumber)

				const folderPath = `Notes/TextRef/Bible/ESV/${a.bookAbbreviation}`;				
				const folderExists = await this.app.vault.adapter.exists(folderPath);

				if (!folderExists) {
					const folderCreateResult = await this.app.vault.createFolder(folderPath)
					new Notice(`Created folder '${folderPath}'.`);
				}

				const filePath = `${folderPath}/${a.bookAbbreviation} ${a.chapterNumber}.md`;
				const fileExists = await this.app.vault.adapter.exists(filePath);

				if (fileExists) {
					new Notice(`File '${folderPath}' has already been downloaded.`);
				}
				else {
					const fileCreateResult = await this.app.vault.create(filePath, fileContents);
					new Notice(`Created file '${filePath}'.`);
				}
			}

			new TextSelectionModal(this.app, callbackFunc).open();
		}


		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('book-down', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			// fetch('https://bolls.life/get-chapter/ESV/2/3/').then(response => {
			// 	response.json().then(y => {
			// 		console.log('y', y);
			// 	});
			// });

			invokeDownloadDialog();
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'download-bible-chapter',
			name: 'Download Bible Chapter',
			callback: () => {
				invokeDownloadDialog();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						//new TextSelectionModal(this.app).open();
						// do something, like open a modal
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			//console.log('click', evt);
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
