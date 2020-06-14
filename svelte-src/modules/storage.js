
class Storage {
	constructor() {
		this.type = 'chromeLocalStorage';
	}

	set(object) {
		return new Promise((resolve, reject) => {
			try {
				chrome.storage.local.set(object, resolve)
			} catch (e) {
				reject(e);
			}
		})
	}

	get(key) {
		return new Promise((resolve, reject) => {
			chrome.storage.local.get(key, data => {
				if (Object.keys(data).length === 0 && data.constructor === Object) reject('no data returned by localStorage')
				resolve(data)
			})
		});
	}
}

const storage = new Storage();

export default storage;