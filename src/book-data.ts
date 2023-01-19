

declare class BookDataOption {
  public id: string
  public name: string
  public firstChapter: number
  public lastChapter: number
  public abbreviation: string
}

export function GetBookData() : BookDataOption[] {
  return [
    { id: '0', name: '--Choose an option--', firstChapter: -1, lastChapter: -1, abbreviation: '' },
    { id: '1', name: 'Genesis', firstChapter: 1, lastChapter: 50, abbreviation: 'Gen' },
    { id: '2', name: 'Exodus', firstChapter: 0, lastChapter: 49, abbreviation: 'Ex' },
    { id: '3', name: 'Leviticus', firstChapter: 1, lastChapter: 48, abbreviation: 'Lev' },
    { id: '4', name: 'Numbers', firstChapter: 0, lastChapter: 47, abbreviation: 'Num' },
    { id: '5', name: 'Deuteronomy', firstChapter: 1, lastChapter: 34, abbreviation: 'Deut' },
    { id: '6', name: 'Joshua', firstChapter: 1, lastChapter: 24, abbreviation: 'Josh' },
    { id: '7', name: 'Judges', firstChapter: 1, lastChapter: 21, abbreviation: 'Judg' },
    { id: '8', name: 'Ruth', firstChapter: 1, lastChapter: 4, abbreviation: 'Ruth' },
    { id: '9', name: '1 Samuel', firstChapter: 1, lastChapter: 31, abbreviation: '1 Sam' },
    { id: '10', name: '2 Samuel', firstChapter: 1, lastChapter: 24, abbreviation: '2 Sam' },
    { id: '11', name: '1 Kings', firstChapter: 1, lastChapter: 22, abbreviation: '1 Kgs' },
    { id: '12', name: '2 Kings', firstChapter: 1, lastChapter: 25, abbreviation: '2 Kgs' },
    { id: '13', name: '1 Chronicles', firstChapter: 1, lastChapter: 29, abbreviation: '1 Chr' },
    { id: '14', name: '2 Chronicles', firstChapter: 1, lastChapter: 36, abbreviation: '2 Chr' },
  ]
}





// 14	
// bookid	15
// chronorder	37
// name	"Ezra"
// chapters	10
// 15	
// bookid	16
// chronorder	38
// name	"Nehemiah"
// chapters	13
// 16	
// bookid	17
// chronorder	36
// name	"Esther"
// chapters	10
// 17	
// bookid	18
// chronorder	2
// name	"Job"
// chapters	42
// 18	
// bookid	19
// chronorder	13
// name	"Psalm"
// chapters	150
// 19	
// bookid	20
// chronorder	17
// name	"Proverbs"
// chapters	31
// 20	
// bookid	21
// chronorder	18
// name	"Ecclesiastes"
// chapters	12
// 21	
// bookid	22
// chronorder	14
// name	"Song of Solomon"
// chapters	8
// 22	
// bookid	23
// chronorder	25
// name	"Isaiah"
// chapters	66
// 23	
// bookid	24
// chronorder	29
// name	"Jeremiah"
// chapters	52
// 24	
// bookid	25
// chronorder	30
// name	"Lamentations"
// chapters	5
// 25	
// bookid	26
// chronorder	32
// name	"Ezekiel"
// chapters	48
// 26	
// bookid	27
// chronorder	33
// name	"Daniel"
// chapters	12
// 27	
// bookid	28
// chronorder	23
// name	"Hosea"
// chapters	14
// 28	
// bookid	29
// chronorder	20
// name	"Joel"
// chapters	3
// 29	
// bookid	30
// chronorder	21
// name	"Amos"
// chapters	9
// 30	
// bookid	31
// chronorder	31
// name	"Obadiah"
// chapters	1
// 31	
// bookid	32
// chronorder	19
// name	"Jonah"
// chapters	4
// 32	
// bookid	33
// chronorder	22
// name	"Micah"
// chapters	7
// 33	
// bookid	34
// chronorder	24
// name	"Nahum"
// chapters	3
// 34	
// bookid	35
// chronorder	27
// name	"Habakkuk"
// chapters	3
// 35	
// bookid	36
// chronorder	26
// name	"Zephaniah"
// chapters	3
// 36	
// bookid	37
// chronorder	34
// name	"Haggai"
// chapters	2
// 37	
// bookid	38
// chronorder	35
// name	"Zechariah"
// chapters	14
// 38	
// bookid	39
// chronorder	39
// name	"Malachi"
// chapters	4
// 39	
// bookid	40
// chronorder	40
// name	"Matthew"
// chapters	28
// 40	
// bookid	41
// chronorder	58
// name	"Mark"
// chapters	16
// 41	
// bookid	42
// chronorder	52
// name	"Luke"
// chapters	24
// 42	
// bookid	43
// chronorder	66
// name	"John"
// chapters	21
// 43	
// bookid	44
// chronorder	54
// name	"Acts"
// chapters	28
// 44	
// bookid	45
// chronorder	46
// name	"Romans"
// chapters	16
// 45	
// bookid	46
// chronorder	44
// name	"1 Corinthians"
// chapters	16
// 46	
// bookid	47
// chronorder	45
// name	"2 Corinthians"
// chapters	13
// 47	
// bookid	48
// chronorder	41
// name	"Galatians"
// chapters	6
// 48	
// bookid	49
// chronorder	47
// name	"Ephesians"
// chapters	6
// 49	
// bookid	50
// chronorder	49
// name	"Philippians"
// chapters	4
// 50	
// bookid	51
// chronorder	50
// name	"Colossians"
// chapters	4
// 51	
// bookid	52
// chronorder	42
// name	"1 Thessalonians"
// chapters	5
// 52	
// bookid	53
// chronorder	43
// name	"2 Thessalonians"
// chapters	3
// 53	
// bookid	54
// chronorder	55
// name	"1 Timothy"
// chapters	6
// 54	
// bookid	55
// chronorder	59
// name	"2 Timothy"
// chapters	4
// 55	
// bookid	56
// chronorder	57
// name	"Titus"
// chapters	3
// 56	
// bookid	57
// chronorder	51
// name	"Philemon"
// chapters	1
// 57	
// bookid	58
// chronorder	53
// name	"Hebrews"
// chapters	13
// 58	
// bookid	59
// chronorder	48
// name	"James"
// chapters	5
// 59	
// bookid	60
// chronorder	56
// name	"1 Peter"
// chapters	5
// 60	
// bookid	61
// chronorder	60
// name	"2 Peter"
// chapters	3
// 61	
// bookid	62
// chronorder	61
// name	"1 John"
// chapters	5
// 62	
// bookid	63
// chronorder	62
// name	"2 John"
// chapters	1
// 63	
// bookid	64
// chronorder	63
// name	"3 John"
// chapters	1
// 64	
// bookid	65
// chronorder	64
// name	"Jude"
// chapters	1
// 65	
// bookid	66
// chronorder	65
// name	"Revelation"
// chapters	22