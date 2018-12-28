let data = {
	fetchNews(){
		let localNews_url = "https://newsapi.org/v2/top-headlines?country=ng&apiKey=c30a9d378fb64233a7781e06ff2a78f1";
		let latestNews_url = "https://newsapi.org/v2/top-headlines?country=ng&apiKey=c30a9d378fb64233a7781e06ff2a78f1";
		let foreignNews_url = "https://newsapi.org/v2/top-headlines?apiKey=c30a9d378fb64233a7781e06ff2a78f1";
		let sportNews_url = "https://newsapi.org/v2/top-headlines?country=ng&category=sport&apiKey=c30a9d378fb64233a7781e06ff2a78f1";
		
		fetch(localNews_url)
		.then((response) => {
			return response.json();
		})
		.then((newsdata) => {
			this.news.home = newsdata.articles;
			console.log(newsdata);
			view.init();
		})
		.catch((err) => {
			return console.log(err);
		})

		fetch(latestNews_url)
		.then((response) => {
			return response.json();
		})
		.then((newsdata) => {
			this.news.latest = newsdata.articles;
			view.init();
		})
		.catch((err) => {
			return console.log(err);
		})

		fetch(sportNews_url)
		.then((response) => {
			return response.json();
		})
		.then((newsdata) => {
			this.news.sport = newsdata.articles;
			view.init();
		})
		.catch((err) => {
			return console.log(err);
		})
	},


	news: {home: null, latest: null, local: null, foreign: null, sport: null}
};

let alpha = {
	getHomeNews(){
		return data.news.home; 
	},

	getLatestNews(){
		return data.news.latest; 
	},

	getLocalNews(){
		return data.news.local; 
	},

	getForeignNews(){
		return data.news.foreign; 
	},

	getSportNews(){
		return data.news.sport; 
	},

	init(){
		data.fetchNews();
	}
};

let view = {
	init(){
		this.main = document.querySelector("main");
		this.mainTemp = document.querySelector("template.main").innerHTML;
		this.storiesTemp = document.querySelector("template.stories").innerHTML;
		this.render();

		let latest = document.querySelector("header > ul > li:nth-child(2n)");
		let local = document.querySelector("header > ul > li:nth-child(3n)");
		let foreign = document.querySelector("header > ul > li:nth-child(4n)");
		let sport = document.querySelector("header > ul > li:nth-child(5n)");

		latest.addEventListener("click", (e) => {
			e.preventDefault();
		});

		local.addEventListener("click", (e) => {
			e.preventDefault();
		});

		foreign.addEventListener("click", (e) => {
			e.preventDefault();
		});

		sport.addEventListener("click", (e) => {
			e.preventDefault();
			console.log(data.news.sport)
			this.renderSport();
		});
	},

	render(){
		let news = alpha.getHomeNews();
		console.log(news);
		let mainTemp, storiesTemp;
		console.log(news);

		mainTemp = this.mainTemp.replace(/{{src}}/g, news[0].urlToImage);
		mainTemp = mainTemp.replace(/{{title}}/g, news[0].title);
		mainTemp = mainTemp.replace(/{{link}}/g, news[0].url);

		this.main.innerHTML = mainTemp;

		for(let i = 1; i < news.length; ++i){
			storiesTemp = this.storiesTemp.replace(/{{src}}/g, news[i].urlToImage);
			storiesTemp = storiesTemp.replace(/{{title}}/g, news[i].title);
			storiesTemp = storiesTemp.replace(/{{link}}/g, news[i].url);
			this.main.innerHTML += storiesTemp;
		}
	},

	renderLatest(){
		let news = alpha.getLatestNews();
		console.log(news);
		let mainTemp, storiesTemp;
		console.log(news);

		mainTemp = this.mainTemp.replace(/{{src}}/g, news[0].urlToImage);
		mainTemp = mainTemp.replace(/{{title}}/g, news[0].title);
		mainTemp = mainTemp.replace(/{{link}}/g, news[0].url);

		this.main.innerHTML = mainTemp;

		for(let i = 1; i < news.length; ++i){
			storiesTemp = this.storiesTemp.replace(/{{src}}/g, news[i].urlToImage);
			storiesTemp = storiesTemp.replace(/{{title}}/g, news[i].title);
			storiesTemp = storiesTemp.replace(/{{link}}/g, news[i].url);
			this.main.innerHTML += storiesTemp;
		}
	},

	renderLocal(){
		let news = alpha.getLocalNews();
		console.log(news);
		let mainTemp, storiesTemp;
		console.log(news);

		mainTemp = this.mainTemp.replace(/{{src}}/g, news[0].urlToImage);
		mainTemp = mainTemp.replace(/{{title}}/g, news[0].title);
		mainTemp = mainTemp.replace(/{{link}}/g, news[0].url);

		this.main.innerHTML = mainTemp;

		for(let i = 1; i < news.length; ++i){
			storiesTemp = this.storiesTemp.replace(/{{src}}/g, news[i].urlToImage);
			storiesTemp = storiesTemp.replace(/{{title}}/g, news[i].title);
			storiesTemp = storiesTemp.replace(/{{link}}/g, news[i].url);
			this.main.innerHTML += storiesTemp;
		}
	},

	renderSport(){
		let news = alpha.getSportNews();
		console.log(news);
		let mainTemp, storiesTemp;
		console.log(news);

		mainTemp = this.mainTemp.replace(/{{src}}/g, news[0].urlToImage);
		mainTemp = mainTemp.replace(/{{title}}/g, news[0].title);
		mainTemp = mainTemp.replace(/{{link}}/g, news[0].url);

		this.main.innerHTML = mainTemp;

		for(let i = 1; i < news.length; ++i){
			storiesTemp = this.storiesTemp.replace(/{{src}}/g, news[i].urlToImage);
			storiesTemp = storiesTemp.replace(/{{title}}/g, news[i].title);
			storiesTemp = storiesTemp.replace(/{{link}}/g, news[i].url);
			this.main.innerHTML += storiesTemp;
		}
	}
};
alpha.init();