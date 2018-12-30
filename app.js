let data = {
	fetchNews(){
		let localNews_url = "https://newsapi.org/v2/top-headlines?country=ng&apiKey=c30a9d378fb64233a7781e06ff2a78f1";
		let foreignNews_url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=c30a9d378fb64233a7781e06ff2a78f1";
		let sportNews_url = "https://newsapi.org/v2/top-headlines?country=ng&category=sport&apiKey=c30a9d378fb64233a7781e06ff2a78f1";
		let techNews_url = "https://newsapi.org/v2/top-headlines?country=ng&category=technology&apiKey=c30a9d378fb64233a7781e06ff2a78f1";
		
		fetch(localNews_url)
		.then((response) => {
			return response.json();
		})
		.then((newsdata) => {
			this.news.local = newsdata.articles;
			console.log(newsdata);
			view.init();
		})
		.catch((err) => {
			return console.log(err);
		})

		fetch(techNews_url)
		.then((response) => {
			return response.json();
		})
		.then((newsdata) => {
			this.news.tech = newsdata.articles;
			console.log(newsdata);
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

		fetch(foreignNews_url)
		.then((response) => {
			return response.json();
		})
		.then((newsdata) => {
			this.news.foreign = newsdata.articles;
			view.init();
		})
		.catch((err) => {
			return console.log(err);
		})
	},


	news: {home: null, local: null, foreign: null, sport: null, tech: null, business: null}
};

let alpha = {
	getHomeNews(){
		let news =  [data.news.local.splice(0, 7), data.news.sport.splice(0, 7), data.news.foreign.splice(0, 7)] ; 
		let sortNews = [];
		for(let item of news){
			for(let each of item){
				sortNews.push(each);
			}
		}
		return sortNews;
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

	getTechNews(){
		console.log(data.news.tech);
		return data.news.tech; 
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

		let local = document.querySelector("header > ul > li:nth-child(2n)");
		let foreign = document.querySelector("header > ul > li:nth-child(3n)");
		let sport = document.querySelector("header > ul > li:nth-child(4n)");
		let tech = document.querySelector("header > ul > li:nth-child(5n)");
		let business = document.querySelector(".menu li:nth-child(7n)");

		tech.addEventListener("click", (e) => {
			e.preventDefault();
			this.renderTech();
		});

		local.addEventListener("click", (e) => {
			e.preventDefault();
		});

		foreign.addEventListener("click", (e) => {
			e.preventDefault();
			this.renderForeign();
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

	renderTech(){
		let news = alpha.getTechNews();
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

	renderForeign(){
		let news = alpha.getForeignNews();
		console.log(news);
		let mainTemp, storiesTemp;

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