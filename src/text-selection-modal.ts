import { App, DropdownComponent, Modal, Setting } from 'obsidian';
import { GetBookData } from './book-data';

export class TextSelectionResult {
  bookId: number
  bookAbbreviation: string
  chapterNumber: number
}

type HandleResultFunction = (choices: TextSelectionResult) => void

export class TextSelectionModal extends Modal {
	constructor(app: App, private handleResultFunction: HandleResultFunction) {
		super(app);
	}

	result = new TextSelectionResult();
  
	onSubmit() {
		console.log('submitted', this.result);
    this.handleResultFunction(this.result)
	}

	private bookSetting: Setting;
  private chapterSetting: Setting | undefined;
  private verseDropdown: DropdownComponent;
  private submitSetting: Setting | undefined;


	onOpen() {
		const { contentEl } = this;

    contentEl.createEl("h1", { text: "Pick book and chapter" });

    // const selecty = contentEl.createEl('select');
    // selecty.innerHTML = '<option>yo</option><option>dawg</option>';

		const bookData = GetBookData();

		this.bookSetting = new Setting(contentEl)
			.setName("Book")
			.addDropdown((drop) => {

				bookData.forEach(book => {
					drop.addOption(book.id, book.name);
				});

				drop.onChange((value) => {
					console.log('dropdown value ', value);
          this.result.bookId = Number.parseInt(value);
          const book = bookData.find(x => x.id === value);
          this.result.bookAbbreviation = book!.abbreviation;
					this.showChapters(contentEl, value);

					this.showSubmit(contentEl);
				});
			});

    //console.log('the ssetting', theSetting);
		console.log('bookSetting', this.bookSetting);
    
	}

	showChapters(contentEl: HTMLElement, bookId: string) {
		console.log('opening with book id', bookId);

    if (bookId === '-1') {
      return;
    }

		const bookData = GetBookData();
    const book = bookData.find(x => x.id === bookId);

    const createOptions = function (selectEl: HTMLElement) {
      for (var i = book!.firstChapter; i <= book!.lastChapter; i++) {
        selectEl.innerHTML += '<option>' + i + '</option>'
      }
    }

		if (this.chapterSetting !== undefined) {
			contentEl.removeChild(this.chapterSetting.settingEl);
			this.chapterSetting = undefined;
		}

		this.chapterSetting = new Setting(contentEl)
		.setName("Chapter")
		.addDropdown((drop) => {

			this.verseDropdown = drop;
			this.verseDropdown.selectEl.innerHTML += '<option>-</option>'
			createOptions(this.verseDropdown.selectEl)

			drop.onChange((value) => {
				console.log('chapter', value);
				this.result.chapterNumber = Number.parseInt(value)
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

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}