(() => {
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

	Array.prototype.slice.call(links).forEach((el) => {
		el.addEventListener("click", (e) => {
			e.preventDefault();
				remove();
				el.	classList.add("active");
			});
	});

	let menuIcon = document.querySelector(".menu-bar");
		menuIcon.addEventListener("click", () => {
			document.querySelector(".menu-bar div:first-child").classList.toggle("rotate");
			document.querySelector(".menu-bar div:nth-child(2n)").classList.toggle("fade");
			document.querySelector(".menu-bar div:last-child").classList.toggle("rotate-re");
		});	

	function remove(){
		Array.prototype.slice.call(links).forEach((el) => {
				el.classList.remove("active");
		});

	}
})()