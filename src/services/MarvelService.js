export default class MarvelService {
    _apiBase = `https://gateway.marvel.com:443/v1/public/`;
    _apiKey = `apikey=16776d21af006d5c271dc36e1c724091`;
	_baseOffset = 210;

	getResource = async (url) => {
		try {
			const res = await fetch(url);
			return await res.json();
		} catch(e) {
			throw new Error(`Not fetch ${url}, status: ${e}`)
		}
	}
	

	getAllCharacters = async (offset = this._baseOffset) => {
		try {
			const characters =  await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
			return characters.data.results.map(this._transformCharacter);
		} catch(e) {
			console.log(e);
			return {}
		}
	}

	getCharacter = async (id) => {
		try {
			const character = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
			return this._transformCharacter(character.data.results[0]);
		} catch(e) {
			console.log(e);
			return {}
		}
	}

    _transformCharacter = (char) => {
		const obj = {
			name: char.name,
			description: char.description,
            thumbnail: char.thumbnail.path + `.` + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items
		}
		if(obj.description.length > 150) {
			obj.description = obj.description.slice(0, 150) + "...";
		}
		Object.keys(obj).forEach(item => {
			if (!obj[item]) {
				obj[item] = 'No more information.';
			}
		});
		return obj;
	}

    // getAllBooks = async () => {
	// 	const res = await this.getResource('/books?page=1&pageSize=10');
	// 	return res.map(this._transformBook);
	// }
	// getBook = async (id) => {
	// 	const book = await this.getResource(`/books/${id}`);
	// 	return this._transformBook(book);
	// }

    // getAllHouses = async () => {
	// 	const res = await this.getResource('/houses?page=1&pageSize=10')
	// 	return res.map(this._transformHouse);
	// }
	// getHouse = async (id) => {
	// 	const house = await this.getResource(`/houses/${id}`);
	// 	return this._transformHouse(house);
	// }

	

	// _transformHouse(house){
	// 	const obj = {
	// 		name: house.name,
	// 		region: house.region,
    //         words: house.words,
    //         titles: house.titles,
    //         overlord: house.overlord,
	// 		ancestralWeapon: house.ancestralWeapon,
	// 	}
	// 	Object.keys(obj).forEach((item, i) => {
	// 		if (!obj[item]) {
	// 			obj[item] = 'No data';
	// 		}
	// 	});
	// 	return obj;
	// }

	// _transformBook(book){
	// 	const obj = {
	// 		name: book.name,
	// 		authors: book.authors,
    //         numberOfPages: book.numberOfPages,
	// 		country: book.country,
	// 		released: book.released,
	// 	}
	// 	obj.released = obj.released.slice(0, 10)
	// 	return obj;
// }
}
