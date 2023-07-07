import { App, DropdownComponent, Modal, Setting } from 'obsidian';
import { GetBookData } from './book-data';
import { AVAILABLE_VERSIONS, BibleChapterDownloaderSettings } from './bible-chapter-downloader-settings';

export class TextSelectionResult {
  bookId: number
  bookAbbreviation: string
  chapterNumber: number
	version: string
}

type HandleResultFunction = (choices: TextSelectionResult) => void

export class TextSelectionModal extends Modal {
	constructor(app: App, settings: BibleChapterDownloaderSettings, private handleResultFunction: HandleResultFunction) {
		super(app);

		this.settings = settings;
	}

	result = new TextSelectionResult();
  
	onSubmit() {
    this.handleResultFunction(this.result)
	}

	private booksSettings: Setting | undefined;
  private chapterSetting: Setting | undefined;
  private verseDropdown: DropdownComponent;
  private submitSetting: Setting | undefined;
	private settings: BibleChapterDownloaderSettings;

	onOpen() {
		this.showVersions();
	}

	showVersions() {
		const { contentEl } = this;

		contentEl.createEl("h2", { text: "Download a Bible chapter" });
		

		new Setting(contentEl)
			.setName("Choose your version")
			.addDropdown((drop) => {
				AVAILABLE_VERSIONS.forEach(version => {
					drop.addOption(version, version);
				});

				console.log('this.settings', this.settings);
				if (this.settings.defaultVersion !== '') {
					drop.setValue(this.settings.defaultVersion);
					this.result.version = this.settings.defaultVersion;
				}
				else {
					console.log('defaulting to first version');
					drop.setValue(AVAILABLE_VERSIONS[0]);
					this.result.version = AVAILABLE_VERSIONS[0];
				}

				drop.onChange((value) => {
          this.result.version = value;
					this.showBooks();
				});

				this.showBooks();
			});    
	}

	showBooks() {
		const { contentEl } = this;

		const bookData = GetBookData();

		this.resetBookSettingsIfExists();
		this.resetChapterSettingsIfExists();

		this.booksSettings = new Setting(contentEl)
			.setName("Book")
			.addDropdown((drop) => {
				bookData.forEach(book => {
					drop.addOption(book.id, book.name);
				});

				drop.onChange((value) => {
          this.result.bookId = Number.parseInt(value);
          const book = bookData.find(x => x.id === value);
          this.result.bookAbbreviation = book!.abbreviation;
					this.showChapters(value);
				});
			});    
	}



	showChapters(bookId: string) {
    if (bookId === '-1') {
      return;
    }

		const { contentEl } = this;

		const bookData = GetBookData();
    const book = bookData.find(x => x.id === bookId);

    const createOptions = function (selectEl: HTMLElement) {
      for (var i = book!.firstChapter; i <= book!.lastChapter; i++) {
        selectEl.innerHTML += '<option>' + i + '</option>'
      }
    }

		this.resetChapterSettingsIfExists();

		this.chapterSetting = new Setting(contentEl)
		.setName("Chapter")
		.addDropdown((drop) => {
			this.verseDropdown = drop;
			this.verseDropdown.selectEl.innerHTML += '<option>-</option>'
			createOptions(this.verseDropdown.selectEl)

			drop.onChange((value) => {
				if (value === '-') {
					return;
				}
				
				this.result.chapterNumber = Number.parseInt(value)

				this.showSubmit(contentEl);
			});
		});
	}

	showSubmit(contentEl: HTMLElement) {

    if (this.submitSetting !== undefined) {
      contentEl.removeChild(this.submitSetting.settingEl);
			this.submitSetting = undefined;
    }

		this.submitSetting = new Setting(contentEl)
		.addButton((btn) =>
			btn
				.setButtonText("Submit")
				.setCta()
				.onClick(() => {
					this.close();
					this.onSubmit();
				}));
	}

	// If the version changes, everything under it should be recreated since different versions will have different values.
	resetBookSettingsIfExists() {
		const { contentEl } = this;
		if (this.booksSettings !== undefined) {
			contentEl.removeChild(this.booksSettings.settingEl);
			this.booksSettings = undefined;
		}
	}

	// If the version changes, everything under it should be recreated since different versions will have different values.
	resetChapterSettingsIfExists() {
		const { contentEl } = this;
		if (this.chapterSetting !== undefined) {
			contentEl.removeChild(this.chapterSetting.settingEl);
			this.chapterSetting = undefined;
		}
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}