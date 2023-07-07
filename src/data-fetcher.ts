import { GetBookData } from './book-data';

interface ApiDataObject {
	verse: string
	text: string
}

export class DataFetcher {

  public static async getBook(translation: string, bookId: number, chapterNumber: number) {
		if (translation === 'ESV') {
			return await this.getESVBookFromBoils(bookId, chapterNumber);
		}
		else {
			return await this.getNETBook(bookId, chapterNumber);
		}

  }

	public static async getESVBookFromBoils(bookId: number, chapterNumber: number) {
		const url = 'https://bolls.life/get-chapter/ESV/' + bookId + '/' + chapterNumber.toString() + '/';
    const response = await fetch(url);

		console.log('HTTP Response', response);
		console.log('HTTP Response Code:', response.status);

		const data: Array<ApiDataObject> = await response.json();

		let contents = `---
version: ESV
---
`;
		data.forEach((v: ApiDataObject) => {
			contents += '###### ' + v.verse + '\n';
			contents += v.text.trim() + '\n';
		});

		console.log('ESV');

		return contents;
	}

	public static async getNETBook(bookId: number, chapterNumber: number) {

		const bookData = GetBookData();
		const book = bookData.find(x => x.id === bookId.toString());

		const url = `https://labs.bible.org/api/?passage=${book?.abbreviation} ${chapterNumber}&type=json`;
    const response = await fetch(url);

		console.log('HTTP Response', response);
		console.log('HTTP Response Code:', response.status);

		const data: Array<ApiDataObject> = await response.json();

		let contents = `---
version: NET
---
`;
		data.forEach((v: ApiDataObject) => {
			contents += '###### ' + v.verse + '\n';
			contents += v.text.trim() + '\n';
		});

		//console.log('NET Contents', contents);

		console.log('NET');

		return contents;
	}

}