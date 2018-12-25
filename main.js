(() => {
	//Registration of service worker
	if(!navigator.serviceWorker){
		console.log("sorry, service worker isnt present in your browser");
	} else {
		window.addEventListener("load", (event) => {
			navigator.serviceWorker.register("sw.js").then((registration) => {
				console.log(registration);
				console.log("registration successful");
			}).catch((err) => {
				console.log("There was an error while setting ip serviceworker");
			})
		});
	}



	let links = document.querySelectorAll("header > ul > li");
	let link = document.querySelector("header > ul > li");
	link.classList.add("active");

	//Displays the border bottom colour of the menu hyperlink that is clicked on 
	Array.prototype.slice.call(links).forEach((el) => {
		el.addEventListener("click", (e) => {
			e.preventDefault();
				remove();
				el.	classList.add("active");
			});
	});


	//Rotates the menu bars and displays the side menu
	let menuIcon = document.querySelector(".menu-bar");
		menuIcon.addEventListener("click", () => {
			document.querySelector(".menu-bar div:first-child").classList.toggle("rotate");
			document.querySelector(".menu-bar div:nth-child(2n)").classList.toggle("fade");
			document.querySelector(".menu-bar div:last-child").classList.toggle("rotate-re");
			document.querySelector("div.menu").classList.toggle("hide");
		});	

	//Removes the border bottom colour of all hyperlinks
	function remove(){
		Array.prototype.slice.call(links).forEach((el) => {
				el.classList.remove("active");
		});

	}
})()