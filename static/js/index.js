console.log(document.querySelector(".menu-btn"));
const skills = document.querySelectorAll(".skill-bar");

const observer = new IntersectionObserver(entries => {

	entries.forEach(entry => {

		if (entry.isIntersecting) {

			const bar = entry.target;

			setTimeout(() => {
				bar.style.height = bar.dataset.height;
			}, 100);

			observer.unobserve(bar);
		}

	});

}, {
	threshold: 0.5
});


skills.forEach(skill => {
	observer.observe(skill);
});


// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");


if (menuBtn && mobileMenu) {

	menuBtn.addEventListener("click", () => {

		mobileMenu.classList.toggle("active");

	});


	document.querySelectorAll(".mobile-menu a").forEach(link => {

		link.addEventListener("click", () => {

			mobileMenu.classList.remove("active");

		});

	});

}

function changeLanguage(lang) {

	const elements = document.querySelectorAll("[data-en]");

	elements.forEach(element => {

		if (lang === "fa") {
			element.innerHTML = element.getAttribute("data-fa");
		}
		else {
			element.innerHTML = element.getAttribute("data-en");
		}

	});


	document.documentElement.lang = lang;


	if (lang === "fa") {

		document.body.style.direction = "rtl";
		langBtn.innerHTML = "EN";

	} else {

		document.body.style.direction = "ltr";
		langBtn.innerHTML = "FA";

	}


	localStorage.setItem("lang", lang);

}

const langBtn = document.getElementById("lang-btn");

let currentLang = localStorage.getItem("lang") || "en";

const languageLoader = document.querySelector(".language-loader");


langBtn.addEventListener("click", () => {


	languageLoader.classList.add("active");

	document.body.style.opacity = "0";

	setTimeout(() => {


		if (currentLang === "en") {

			currentLang = "fa";

		} else {

			currentLang = "en";

		}


		changeLanguage(currentLang);



		setTimeout(() => {


			languageLoader.classList.remove("active");


		}, 180);



	}, 220);


});

// اجرای اولیه
changeLanguage(currentLang);