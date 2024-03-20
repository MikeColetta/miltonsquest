import kaboom from "kaboom"

const k = kaboom({
	global: true,
	stretch: true, // Resize the content
	letterbox: true, // Keep the aspect ratio (adding black bars)
	width: 480,
	height: 720,
	clearColor: [1, 1, 1, 1],
	canvas: document.getElementById('game'),
	debug: true
})

k.loadSprite("bean", "sprites/bean.png")

const player = k.add([
	k.pos(240, 600),
	k.sprite("bean"),
	k.area(),
	{ speed: 300 }
])

k.onKeyDown("a", () => {
	player.move(-player.speed, 0)
})

k.onKeyDown("d", () => {
	player.move(player.speed, 0)
})

// add obstacle
function spawnObstacle() {
	k.add([
		k.rect(20, 20),
		k.pos(rand(10, 470), -20),
		k.area(),
		k.outline(4),
		k.color(255, 180, 255),
		k.move(DOWN, player.speed),
		"obstacle",
	])

	// wait a random amount of time to spawn next tree
	wait(rand(0.5, 1.5), spawnObstacle);
}

spawnObstacle()

player.onCollide("obstacle", () => {
	k.addKaboom(player.pos);
	k.shake();
});