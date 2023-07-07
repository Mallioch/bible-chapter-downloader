import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting, Vault, DataWriteOptions } from 'obsidian';
import { TextSelectionModal, TextSelectionResult } from './src/text-selection-modal';
import { DataFetcher } from 'src/data-fetcher';
import { BibleChapterDownloaderSettings, DEFAULT_SETTINGS } from 'src/bible-chapter-downloader-settings';
import { SettingsDialog } from 'src/settings-dialog';

interface ApiDataObject {
	verse: string
	text: string
}

export default class BibleChapterDownloaderPlugin extends Plugin {
	settings: BibleChapterDownloaderSettings;

	async onload() {
		await this.loadSettings();

		const invokeDownloadDialog = () => {
			const callbackFunc = async (a: TextSelectionResult) => {
				console.log('TextSelectionResult', a);
				const fileContents = await DataFetcher.getBook(a.version, a.bookId, a.chapterNumber)

				const folderPath = `${this.settings.fileLocation}/${a.version}/${a.bookAbbreviation}`;				
				const folderExists = await this.app.vault.adapter.exists(folderPath);

				if (!folderExists) {
					await this.app.vault.createFolder(folderPath)
					new Notice(`Created folder '${folderPath}'.`);
				}

				let filePath = `${folderPath}/${a.bookAbbreviation} ${a.chapterNumber}.md`;
				if (a.version !== this.settings.defaultVersion && '' !== this.settings.defaultVersion) {
					filePath = `${folderPath}/${a.version} ${a.bookAbbreviation} ${a.chapterNumber}.md`;
				}
				const fileExists = await this.app.vault.adapter.exists(filePath);

				if (fileExists) {
					new Notice(`File '${folderPath}' has already been downloaded.`);
				}
				else {
					const fileCreateResult = await this.app.vault.create(filePath, fileContents);
					new Notice(`Created file '${filePath}'.`);
				}
			}

			new TextSelectionModal(this.app, this.settings, callbackFunc).open();
		}


		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('book-down', 'Sample Plugin', (evt: MouseEvent) => {
			invokeDownloadDialog();
		});

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'download-bible-chapter',
			name: 'Download Bible Chapter',
			callback: () => {
				invokeDownloadDialog();
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingsDialog(this.app, this));
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