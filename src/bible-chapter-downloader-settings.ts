export interface BibleChapterDownloaderSettings {
	fileLocation: string;
	defaultVersion: string;
}

export const DEFAULT_SETTINGS: BibleChapterDownloaderSettings = {
	fileLocation: 'Texts/Bible',
	defaultVersion: ''
}

export const AVAILABLE_VERSIONS = ['NET', 'ESV'];