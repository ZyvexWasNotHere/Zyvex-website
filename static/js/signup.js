function togglePassword(id, icon) {

	const input = document.getElementById(id);

	if (input.type === "password") {
		// نمایش رمز
		input.type = "text";

		icon.classList.remove("fa-eye");
		icon.classList.add("fa-eye-slash");
	} else {
		// مخفی کردن رمز
		input.type = "password";

		icon.classList.remove("fa-eye-slash");
		icon.classList.add("fa-eye");
	}

}

document.querySelectorAll("a").forEach(link => {

	link.addEventListener("click", function(e) {

		const href = this.getAttribute("href");

		if (href.startsWith("#")) return;

		e.preventDefault();

		document.body.classList.add("fade-out");

		setTimeout(() => {
			window.location.href = href;
		}, 250);

	});

});


function closePopup() {

	document.getElementById("popup").style.display = "none";

	setTimeout(() => {
		document.body.classList.add("fade-out");

		setTimeout(() => {
			window.location.href = "/login";
		}, 250);

	}, 300);

}