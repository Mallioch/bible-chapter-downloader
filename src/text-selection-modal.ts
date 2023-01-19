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

  private chapterSetting: Setting;
  private verseDropdown: DropdownComponent;
  private submitSetting: Setting;


	onOpen() {
		const { contentEl } = this;

    contentEl.createEl("h1", { text: "Pick book and chapter" });

    // const selecty = contentEl.createEl('select');
    // selecty.innerHTML = '<option>yo</option><option>dawg</option>';

		const bookData = GetBookData();

		new Setting(contentEl)
			.setName("Book 2")
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
				});
			});

    //console.log('the ssetting', theSetting);
    
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

    if (this.chapterSetting == null) {
      this.chapterSetting = new Setting(contentEl)
      .setName("Chapter")
      .addDropdown((drop) => {

        this.verseDropdown = drop;
        createOptions(this.verseDropdown.selectEl)

        drop.onChange((value) => {
					console.log('chapter', value);
          this.result.chapterNumber = Number.parseInt(value)
					this.showSubmit(contentEl);
        });
			});
    }
    else {
      this.verseDropdown.selectEl.innerHTML = '';
      createOptions(this.verseDropdown.selectEl)
    }



				
	}

	showSubmit(contentEl: HTMLElement) {

    if (this.submitSetting != undefined) {
      return;
    }

		new Setting(contentEl)
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
		const {contentEl} = this;
		contentEl.empty();
	}
}