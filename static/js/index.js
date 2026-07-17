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