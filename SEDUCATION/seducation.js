// Neon Seduction JavaScript - Ultra Hot Edition
class NeonSeduction {
	constructor() {
		this.currentEffect = "pulse";
		this.currentMood = "lounge";
		this.currentZoom = 1;
		this.autoMode = false;
		this.heatLevel = 5;
		this.currentColor = { r: 255, g: 20, b: 147 };
		this.effectIntensity = 5;
		this.isFullscreen = false;

		this.init();
	}

	init() {
		this.createParticles();
		this.bindEvents();
		this.startHeatAnimation();
		this.updateImageColor();
		this.startAutoEffects();
	}

	// Particle system
	createParticles() {
		const container = document.getElementById("particles");
		const particleCount = 50;

		for (let i = 0; i < particleCount; i++) {
			setTimeout(() => {
				this.createParticle(container);
			}, i * 200);
		}

		// Continuously create new particles
		setInterval(() => {
			this.createParticle(container);
		}, 1000);
	}

	createParticle(container) {
		const particle = document.createElement("div");
		particle.className = `particle ${Math.random() > 0.5 ? "hot" : "cool"}`;

		const size = Math.random() * 6 + 2;
		particle.style.width = `${size}px`;
		particle.style.height = `${size}px`;
		particle.style.left = `${Math.random() * 100}%`;
		particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
		particle.style.animationDelay = `${Math.random() * 5}s`;

		container.appendChild(particle);

		setTimeout(() => {
			if (particle.parentNode) {
				particle.parentNode.removeChild(particle);
			}
		}, 25000);
	}

	// Event binding
	bindEvents() {
		// Navigation buttons
		document.querySelectorAll(".nav-btn").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const target = e.currentTarget.dataset.target;
				this.togglePanel(target);
				this.playHeatSound();
			});
		});

		// Close buttons
		document.querySelectorAll(".close-btn").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const panel = e.target.closest(".slide-panel");
				panel.classList.remove("active");
				this.updateNavButtons();
			});
		});

		// Color presets
		document.querySelectorAll(".color-btn").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const color = e.currentTarget.dataset.color;
				this.setColorFromHex(color);
				this.playHeatSound();
			});
		});

		// Color sliders
		this.bindColorSliders();

		// Effect buttons
		document.querySelectorAll(".effect-btn").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const effect = e.currentTarget.dataset.effect;
				this.setEffect(effect);
				this.playHeatSound();
			});
		});

		// Mood buttons
		document.querySelectorAll(".mood-btn").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const mood = e.currentTarget.dataset.mood;
				this.setMood(mood);
				this.playHeatSound();
			});
		});

		// Size buttons
		document.querySelectorAll(".size-btn").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const size = e.currentTarget.dataset.size;
				this.handleSizeChange(size);
				this.playHeatSound();
			});
		});

		// Action buttons
		document.querySelectorAll(".action-btn").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const action = e.currentTarget.dataset.action;
				this.handleAction(action);
				this.playHeatSound();
			});
		});

		// Image click
		document.getElementById("neonImage").addEventListener("click", () => {
			this.randomizeAll();
			this.playHeatSound();
		});

		// Escape key to close panels
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				this.closeAllPanels();
			}
		});
	}

	bindColorSliders() {
		const redSlider = document.getElementById("redRange");
		const greenSlider = document.getElementById("greenRange");
		const blueSlider = document.getElementById("blueRange");
		const heatSlider = document.getElementById("heatIntensity");
		const effectSlider = document.getElementById("effectIntensity");

		redSlider.addEventListener("input", (e) => {
			this.currentColor.r = parseInt(e.target.value);
			this.updateColorDisplay();
			this.updateImageColor();
		});

		greenSlider.addEventListener("input", (e) => {
			this.currentColor.g = parseInt(e.target.value);
			this.updateColorDisplay();
			this.updateImageColor();
		});

		blueSlider.addEventListener("input", (e) => {
			this.currentColor.b = parseInt(e.target.value);
			this.updateColorDisplay();
			this.updateImageColor();
		});

		heatSlider.addEventListener("input", (e) => {
			this.heatLevel = parseInt(e.target.value);
			this.updateHeatDisplay();
			this.updateHeatBar();
		});

		effectSlider.addEventListener("input", (e) => {
			this.effectIntensity = parseInt(e.target.value);
			this.updateEffectDisplay();
			this.updateEffectIntensity();
		});
	}

	// Panel management
	togglePanel(target) {
		const panel = document.getElementById(target);
		const isActive = panel.classList.contains("active");

		// Close all panels first
		this.closeAllPanels();

		// Open the target panel if it wasn't active
		if (!isActive) {
			panel.classList.add("active");
		}

		this.updateNavButtons();
	}

	closeAllPanels() {
		document.querySelectorAll(".slide-panel").forEach((panel) => {
			panel.classList.remove("active");
		});
		this.updateNavButtons();
	}

	updateNavButtons() {
		document.querySelectorAll(".nav-btn").forEach((btn) => {
			const target = btn.dataset.target;
			const panel = document.getElementById(target);

			if (panel && panel.classList.contains("active")) {
				btn.classList.add("active");
			} else {
				btn.classList.remove("active");
			}
		});
	}

	// Color management
	setColorFromHex(hex) {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);

		this.currentColor = { r, g, b };
		this.updateColorSliders();
		this.updateColorDisplay();
		this.updateImageColor();
	}

	updateColorSliders() {
		document.getElementById("redRange").value = this.currentColor.r;
		document.getElementById("greenRange").value = this.currentColor.g;
		document.getElementById("blueRange").value = this.currentColor.b;
	}

	updateColorDisplay() {
		document.getElementById("redValue").textContent = this.currentColor.r;
		document.getElementById("greenValue").textContent = this.currentColor.g;
		document.getElementById("blueValue").textContent = this.currentColor.b;
	}

	updateImageColor() {
		const image = document.getElementById("neonImage");
		const { r, g, b } = this.currentColor;
		const intensity = this.heatLevel / 10;

		const filterValue = `drop-shadow(0 0 ${
			25 + intensity * 20
		}px rgb(${r}, ${g}, ${b})) 
                           hue-rotate(${(r + g + b) / 3 - 127}deg) 
                           saturate(${1 + intensity * 0.5}) 
                           brightness(${1 + intensity * 0.2})`;

		image.style.filter = filterValue;

		// Update CSS variables
		document.documentElement.style.setProperty(
			"--neon-primary",
			`rgb(${r}, ${g}, ${b})`
		);
	}

	// Effect management
	setEffect(effect) {
		this.currentEffect = effect;
		const image = document.getElementById("neonImage");

		// Remove existing effect classes
		image.classList.remove(
			"pulse-effect",
			"flicker-effect",
			"throb-effect",
			"glow-effect",
			"wave-effect"
		);

		// Add new effect class
		image.classList.add(`${effect}-effect`);

		// Update effect buttons
		document.querySelectorAll(".effect-btn").forEach((btn) => {
			btn.classList.remove("active");
			if (btn.dataset.effect === effect) {
				btn.classList.add("active");
			}
		});

		this.applyEffectStyles(effect);
	}

	applyEffectStyles(effect) {
		const image = document.getElementById("neonImage");
		const intensity = this.effectIntensity / 10;

		// Remove existing animations
		image.style.animation = "";

		switch (effect) {
			case "pulse":
				image.style.animation = `pulse-glow ${2 - intensity}s infinite alternate`;
				break;
			case "flicker":
				image.style.animation = `flicker-effect ${0.5 + intensity * 0.5}s infinite`;
				break;
			case "throb":
				image.style.animation = `throb-effect ${
					1.5 - intensity * 0.5
				}s infinite ease-in-out`;
				break;
			case "glow":
				image.style.animation = `glow-effect ${3 - intensity}s infinite alternate`;
				break;
			case "wave":
				image.style.animation = `wave-effect ${2 - intensity * 0.5}s infinite`;
				break;
		}
	}

	// Mood management
	setMood(mood) {
		this.currentMood = mood;
		const body = document.body;

		// Remove existing mood classes
		body.classList.remove(
			"lounge-mood",
			"club-mood",
			"private-mood",
			"fire-mood"
		);

		// Add new mood class
		body.classList.add(`${mood}-mood`);

		// Update mood buttons
		document.querySelectorAll(".mood-btn").forEach((btn) => {
			btn.classList.remove("active");
			if (btn.dataset.mood === mood) {
				btn.classList.add("active");
			}
		});

		this.applyMoodStyles(mood);
	}

	applyMoodStyles(mood) {
		const root = document.documentElement;

		switch (mood) {
			case "lounge":
				root.style.setProperty("--bg-primary", "#1a0d1a");
				root.style.setProperty("--accent-color", "#ff69b4");
				break;
			case "club":
				root.style.setProperty("--bg-primary", "#0d1a1a");
				root.style.setProperty("--accent-color", "#00ffff");
				break;
			case "private":
				root.style.setProperty("--bg-primary", "#1a1a0d");
				root.style.setProperty("--accent-color", "#ffff00");
				break;
			case "fire":
				root.style.setProperty("--bg-primary", "#1a0d0d");
				root.style.setProperty("--accent-color", "#ff4500");
				break;
		}
	}

	// Size management
	handleSizeChange(size) {
		const image = document.getElementById("neonImage");
		const container = document.querySelector(".image-container");

		switch (size) {
			case "zoomIn":
				this.currentZoom = Math.min(this.currentZoom + 0.2, 3);
				break;
			case "zoomOut":
				this.currentZoom = Math.max(this.currentZoom - 0.2, 0.5);
				break;
			case "reset":
				this.currentZoom = 1;
				break;
			case "fullscreen":
				this.toggleFullscreen();
				return;
		}

		image.style.transform = `scale(${this.currentZoom})`;
	}

	toggleFullscreen() {
		const image = document.getElementById("neonImage");

		if (!this.isFullscreen) {
			image.style.position = "fixed";
			image.style.top = "0";
			image.style.left = "0";
			image.style.width = "100vw";
			image.style.height = "100vh";
			image.style.objectFit = "cover";
			image.style.zIndex = "9999";
			this.isFullscreen = true;
		} else {
			image.style.position = "relative";
			image.style.top = "auto";
			image.style.left = "auto";
			image.style.width = "auto";
			image.style.height = "auto";
			image.style.objectFit = "contain";
			image.style.zIndex = "2";
			this.isFullscreen = false;
		}
	}

	// Action management
	handleAction(action) {
		switch (action) {
			case "randomize":
				this.randomizeAll();
				break;
			case "resetAll":
				this.resetAll();
				break;
			case "heat":
				this.maximumHeat();
				break;
			case "auto":
				this.toggleAutoMode();
				break;
		}
	}

	randomizeAll() {
		// Random color
		this.currentColor = {
			r: Math.floor(Math.random() * 256),
			g: Math.floor(Math.random() * 256),
			b: Math.floor(Math.random() * 256)
		};

		// Random effect
		const effects = ["pulse", "flicker", "throb", "glow", "wave"];
		const randomEffect = effects[Math.floor(Math.random() * effects.length)];

		// Random mood
		const moods = ["lounge", "club", "private", "fire"];
		const randomMood = moods[Math.floor(Math.random() * moods.length)];

		// Random heat level
		this.heatLevel = Math.floor(Math.random() * 10) + 1;
		this.effectIntensity = Math.floor(Math.random() * 10) + 1;

		// Apply changes
		this.updateColorSliders();
		this.updateColorDisplay();
		this.updateImageColor();
		this.setEffect(randomEffect);
		this.setMood(randomMood);
		this.updateHeatDisplay();
		this.updateEffectDisplay();
		this.updateHeatBar();
	}

	resetAll() {
		this.currentColor = { r: 255, g: 20, b: 147 };
		this.heatLevel = 5;
		this.effectIntensity = 5;
		this.currentZoom = 1;
		this.autoMode = false;

		this.updateColorSliders();
		this.updateColorDisplay();
		this.updateImageColor();
		this.setEffect("pulse");
		this.setMood("lounge");
		this.updateHeatDisplay();
		this.updateEffectDisplay();
		this.updateHeatBar();

		const image = document.getElementById("neonImage");
		image.style.transform = "scale(1)";
	}

	maximumHeat() {
		this.currentColor = { r: 255, g: 69, b: 0 };
		this.heatLevel = 10;
		this.effectIntensity = 10;

		this.updateColorSliders();
		this.updateColorDisplay();
		this.updateImageColor();
		this.setEffect("throb");
		this.setMood("fire");
		this.updateHeatDisplay();
		this.updateEffectDisplay();
		this.updateHeatBar();
	}

	toggleAutoMode() {
		this.autoMode = !this.autoMode;
		const btn = document.querySelector('[data-action="auto"]');

		if (this.autoMode) {
			btn.classList.add("active");
			this.startAutoSequence();
		} else {
			btn.classList.remove("active");
			this.stopAutoSequence();
		}
	}

	startAutoSequence() {
		this.autoInterval = setInterval(() => {
			if (this.autoMode) {
				this.randomizeAll();
			}
		}, 3000);
	}

	stopAutoSequence() {
		if (this.autoInterval) {
			clearInterval(this.autoInterval);
		}
	}

	// Display updates
	updateHeatDisplay() {
		document.getElementById("intensityValue").textContent = this.heatLevel;
		document.getElementById("heatIntensity").value = this.heatLevel;
	}

	updateEffectDisplay() {
		document.getElementById(
			"effectIntensityValue"
		).textContent = this.effectIntensity;
		document.getElementById("effectIntensity").value = this.effectIntensity;
	}

	updateEffectIntensity() {
		this.applyEffectStyles(this.currentEffect);
	}

	// Heat bar animation
	startHeatAnimation() {
		const heatBar = document.getElementById("heatBar");
		let direction = 1;

		setInterval(() => {
			const currentWidth = parseInt(heatBar.style.width) || 60;
			const newWidth = currentWidth + direction * 5;

			if (newWidth >= 90) direction = -1;
			if (newWidth <= 40) direction = 1;

			heatBar.style.width = `${newWidth}%`;
		}, 100);
	}

	updateHeatBar() {
		const heatBar = document.getElementById("heatBar");
		const baseWidth = 40 + this.heatLevel * 5;
		heatBar.style.width = `${baseWidth}%`;
	}

	// Auto effects
	startAutoEffects() {
		// Subtle background color shifting
		setInterval(() => {
			const body = document.body;
			const hue = (Date.now() / 100) % 360;
			body.style.background = `radial-gradient(circle at 50% 50%, 
                hsl(${hue}, 30%, 5%) 0%, 
                hsl(${hue + 60}, 25%, 3%) 50%, 
                hsl(${hue + 120}, 20%, 7%) 100%)`;
		}, 50);
	}

	// Sound effects
	playHeatSound() {
		const audio = document.getElementById("heatSound");
		if (audio) {
			audio.currentTime = 0;
			audio.play().catch(() => {
				// Ignore autoplay restrictions
			});
		}
	}
}

// CSS animations (add these to your CSS)
const dynamicStyles = `
@keyframes pulse-glow {
    0% { filter: drop-shadow(0 0 20px var(--neon-pink)) brightness(1); }
    100% { filter: drop-shadow(0 0 40px var(--neon-pink)) brightness(1.3); }
}

@keyframes flicker-effect {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
    25%, 75% { opacity: 0.9; }
}

@keyframes throb-effect {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes glow-effect {
    0% { filter: drop-shadow(0 0 15px var(--neon-pink)) brightness(1); }
    100% { filter: drop-shadow(0 0 50px var(--neon-pink)) brightness(1.5); }
}

@keyframes wave-effect {
    0%, 100% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.02) rotate(0.5deg); }
    50% { transform: scale(1.04) rotate(0deg); }
    75% { transform: scale(1.02) rotate(-0.5deg); }
}

.lounge-mood {
    --bg-primary: #1a0d1a;
    --accent-color: #ff69b4;
}

.club-mood {
    --bg-primary: #0d1a1a;
    --accent-color: #00ffff;
}

.private-mood {
    --bg-primary: #1a1a0d;
    --accent-color: #ffff00;
}

.fire-mood {
    --bg-primary: #1a0d0d;
    --accent-color: #ff4500;
}

.action-btn.active {
    background: var(--gradient-fire);
    color: white;
    transform: scale(1.1);
}

.effect-btn.active {
    border: 2px solid var(--neon-pink);
    background: rgba(255, 20, 147, 0.2);
}

.mood-btn.active {
    border: 2px solid var(--neon-orange);
    background: rgba(255, 69, 0, 0.2);
}
`;

// Add dynamic styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
	new NeonSeduction();
});

// Additional utility functions
function getRandomColor() {
	const colors = [
		"#ff1493",
		"#ff4500",
		"#dc143c",
		"#8a2be2",
		"#00bfff",
		"#00ff41",
		"#ff69b4",
		"#ff8c00",
		"#9932cc",
		"#1e90ff",
		"#32cd32",
		"#ffd700"
	];
	return colors[Math.floor(Math.random() * colors.length)];
}

function createExplosion(x, y) {
	const explosion = document.createElement("div");
	explosion.style.position = "fixed";
	explosion.style.left = x + "px";
	explosion.style.top = y + "px";
	explosion.style.width = "10px";
	explosion.style.height = "10px";
	explosion.style.background = "radial-gradient(circle, #ff1493, transparent)";
	explosion.style.borderRadius = "50%";
	explosion.style.animation = "explode 0.5s ease-out forwards";
	explosion.style.pointerEvents = "none";
	explosion.style.zIndex = "10000";

	document.body.appendChild(explosion);

	setTimeout(() => {
		if (explosion.parentNode) {
			explosion.parentNode.removeChild(explosion);
		}
	}, 500);
}

// Add explosion animation
const explosionCSS = `
@keyframes explode {
    0% { 
        transform: scale(1); 
        opacity: 1; 
    }
    100% { 
        transform: scale(20); 
        opacity: 0; 
    }
}
`;

styleSheet.textContent += explosionCSS;
