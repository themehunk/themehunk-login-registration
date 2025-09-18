(function () {
	const {
		enabled,
		duration,
		show_warning,
		warning_duration,
		logout_url,
		is_logged_in
	} = window.thloginSessionSettings || {};
    
	if (!enabled || !is_logged_in) return;

	let inactivityTimer;
	let warningTimer;
	let warningShown = false;

	const resetTimers = () => {
		if (inactivityTimer) clearTimeout(inactivityTimer);
		if (warningTimer) clearTimeout(warningTimer);

		if (show_warning) {
			warningTimer = setTimeout(() => {
				showLogoutWarning();
			}, (duration - warning_duration) * 1000);
		}

		inactivityTimer = setTimeout(() => {
			window.location.href = logout_url;
		}, duration * 1000);
	};

	const showLogoutWarning = () => {
		if (warningShown) return;
		warningShown = true;

		const div = document.createElement('div');
		div.className = 'thlogin-session-warning';
		div.innerHTML = `
			<div class="thlogin-session-warning-inner">
				<p>You will be logged out in <span id="thlogin-warning-count">${warning_duration}</span> seconds due to inactivity.</p>
				<button id="thlogin-stay-logged-in">Stay Logged In</button>
			</div>
		`;
		document.body.appendChild(div);

		const countEl = document.getElementById('thlogin-warning-count');
		let remaining = warning_duration;

		const countdown = setInterval(() => {
			remaining--;
			if (remaining <= 0) {
				clearInterval(countdown);
				window.location.href = logout_url;
			} else {
				countEl.textContent = remaining;
			}
		}, 1000);

		document.getElementById('thlogin-stay-logged-in').addEventListener('click', () => {
			clearInterval(countdown);
			div.remove();
			warningShown = false;
			resetTimers(); // restart everything
		});
	};

	// Detect user activity
	['mousemove', 'keydown', 'scroll', 'click'].forEach((evt) => {
		document.addEventListener(evt, resetTimers);
	});

	resetTimers(); // start on page load
})();
