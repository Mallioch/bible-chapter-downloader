import { App, PluginSettingTab, Setting } from 'obsidian';
import BibleChapterDownloaderPlugin from '../main';


export class SettingsDialog extends PluginSettingTab {
	plugin: BibleChapterDownloaderPlugin;

	constructor(app: App, plugin: BibleChapterDownloaderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for the Bible Chapter Downloader.'});

		new Setting(containerEl)
			.setName('File Location')
			.setDesc('In what folder do you store your Bible files?')
			.addText(text => text
				.setPlaceholder('Folder name')
				.setValue(this.plugin.settings.fileLocation)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.fileLocation = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Default Version")
			.addDropdown((drop) => {
				
				drop.addOption('', 'None');
				drop.addOption('ESV', 'ESV');
				drop.addOption('NET', 'NET');
				drop.setValue(this.plugin.settings.defaultVersion);

				drop.onChange(async (value) => {
					console.log('setting translation', value);
					this.plugin.settings.defaultVersion = value;
					await this.plugin.saveSettings();
				});
			});    
				



	}
}