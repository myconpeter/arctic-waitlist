document.addEventListener('DOMContentLoaded', function () {
	const canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	const ctx = canvas.getContext('2d');

	canvas.style.position = 'fixed';
	canvas.style.top = '0';
	canvas.style.left = '0';
	canvas.style.zIndex = '-1';

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);

	const snowflakes = [];
	for (let i = 0; i < 100; i++) {
		snowflakes.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			size: Math.random() * 2 + 0.5,
			speedY: Math.random() * 0.8 + 0.2,
			speedX: Math.random() * 0.3 - 0.15,
		});
	}

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Arctic night gradient
		const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
		gradient.addColorStop(0, '#000000');
		gradient.addColorStop(0.5, '#000000');
		gradient.addColorStop(1, '#000000');
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw snowflakes
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		snowflakes.forEach((snowflake) => {
			snowflake.x += snowflake.speedX;
			snowflake.y += snowflake.speedY;

			if (snowflake.x > canvas.width) snowflake.x = 0;
			if (snowflake.x < 0) snowflake.x = canvas.width;
			if (snowflake.y > canvas.height) snowflake.y = 0;

			ctx.beginPath();
			ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
			ctx.fill();
		});

		requestAnimationFrame(animate);
	}

	animate();
});
