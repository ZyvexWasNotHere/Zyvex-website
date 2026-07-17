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

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");


menuBtn.addEventListener("click", () => {

	mobileMenu.classList.toggle("active");

});



document.querySelectorAll(".mobile-menu a").forEach(link => {

	link.addEventListener("click", () => {

		mobileMenu.classList.remove("active");

	});

});
