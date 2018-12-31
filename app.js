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
			view.init();
		})
		.catch((err) => {
			console.log(err);
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
			console.log(err);
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
			console.log(err);
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
			console.log(err);
		})
	},


	news: {home: null, local: null, foreign: null, sport: null, tech: null, business: null}
};

let alpha = {
	getHomeNews(){
		let news =  [data.news.local.slice(0, 7), data.news.foreign.slice(0, 7), data.news.sport.slice(0, 7)]; 
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
		return data.news.tech; 
	},

	init(){
		data.fetchNews();
	}
};

class NewsCat{
	constructor(source){
		this.source = source;
		this.mainTemp = view.mainTemp;
		this.storiesTemp = view.storiesTemp;
		this.main = view.main;
	}

	render(){
		let news = this.source();
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
}

let view = {
	homeInit(){
		this.local =document.querySelector("section.local");
		this.sport = document.querySelector("section.sport");
		this.foreign = document.querySelector("section.foreign");
	},

	init(){

		let home = document.querySelector("header > ul > li:first-child");
		let local = document.querySelector("header > ul > li:nth-child(2n)");
		let foreign = document.querySelector("header > ul > li:nth-child(3n)");
		let sport = document.querySelector("header > ul > li:nth-child(4n)");
		let tech = document.querySelector("header > ul > li:nth-child(5n)");
		let business = document.querySelector(".menu li:nth-child(7n)");

		this.main = document.querySelector("main");
		this.homeTemp = document.querySelector("template.home").innerHTML;
		this.storiesTemp = document.querySelector("template.stories").innerHTML;
		this.mainTemp = document.querySelector("template.mainTemp").innerHTML;
		this.render();

		home.addEventListener("click", (e) => {
			e.preventDefault();
			this.render();
		});

		tech.addEventListener("click", (e) => {
			e.preventDefault();
			let tech = new NewsCat(alpha.getTechNews);
			tech.render();
		});

		local.addEventListener("click", (e) => {
			e.preventDefault();
			let local = new NewsCat(alpha.getLocalNews);
			local.render();
		});

		foreign.addEventListener("click", (e) => {
			let foreign = new NewsCat(alpha.getForeignNews);
			foreign.render();
		});

		sport.addEventListener("click", (e) => {
			e.preventDefault();
			let sport = new NewsCat(alpha.getSportNews);
			sport.render();
		});
	},

	
	render(){
		let news = alpha.getHomeNews();
		let storiesTemp;
		console.log(news);

		this.main.innerHTML = this.homeTemp;
		this.homeInit();

		for(let i = 0; i < 7; ++i){
			storiesTemp = this.storiesTemp.replace(/{{src}}/g, news[i].urlToImage);
			storiesTemp = storiesTemp.replace(/{{title}}/g, news[i].title);
			storiesTemp = storiesTemp.replace(/{{link}}/g, news[i].url);
			this.local.innerHTML += storiesTemp;
		}

		for(let i = 7; i < 14; ++i){
			storiesTemp = this.storiesTemp.replace(/{{src}}/g, news[i].urlToImage);
			storiesTemp = storiesTemp.replace(/{{title}}/g, news[i].title);
			storiesTemp = storiesTemp.replace(/{{link}}/g, news[i].url);
			this.foreign.innerHTML += storiesTemp;
		}

		for(let i = 14; i < 21; ++i){
			storiesTemp = this.storiesTemp.replace(/{{src}}/g, news[i].urlToImage);
			storiesTemp = storiesTemp.replace(/{{title}}/g, news[i].title);
			storiesTemp = storiesTemp.replace(/{{link}}/g, news[i].url);
			this.sport.innerHTML += storiesTemp;
		}
	}	
}
alpha.init();