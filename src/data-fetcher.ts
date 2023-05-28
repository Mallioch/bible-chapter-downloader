

interface ApiDataObject {
	verse: string
	text: string
}

export class DataFetcher {

  public static async getBook(bookId: number, chapterNumber: number) {
		const url = 'https://bolls.life/get-chapter/ESV/' + bookId + '/' + chapterNumber.toString() + '/';
    const response = await fetch(url);

		console.log('HTTP Response', response);
		console.log('HTTP Response Code:', response.status);

		const data: Array<ApiDataObject> = await response.json();

		let contents = '';
		data.forEach((v: ApiDataObject) => {
			contents += '###### ' + v.verse + '\n';
			contents += v.text.trim() + '\n';
		});

		return contents;

  }

}