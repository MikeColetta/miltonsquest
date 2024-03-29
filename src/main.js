import kaboom from "kaboom";
import { createPlayer } from "./player";

// keep track of score
let score = 0;

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

k.scene("levelOne", () => {

	const player = createPlayer();

	k.onKeyDown("a", () => {
		player.move(-player.speed, 0)
	}),

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

		// wait a random amount of time to spawn next obstacle
		wait(rand(0.5, 1.5), spawnObstacle);
	}

	function spawnReward() {
		k.add([
			k.rect(20, 20),
			k.pos(rand(10, 470), -20),
			k.area(),
			k.outline(4),
			k.color(20, 150, 15),
			k.move(DOWN, player.speed),
			"reward",
		])

		// wait a random amount of time to spawn next reward
		wait(rand(2.5, 3.5), spawnReward);
	}

	spawnObstacle();
	spawnReward();

	player.onCollide("obstacle", () => {
		k.addKaboom(player.pos);
		k.shake();
		go("lose");
	});

	player.onCollide("reward", (reward) => {
		score += 10;
		k.destroy(reward)
	});

	const scoreLabel = add([
		k.text(score),
		k.pos(24, 24),
	]);

	onUpdate(() => {
		scoreLabel.text = score;
	});

	const leftWall = k.add([
		k.rect(10, 720),
		k.pos(-12, 0),
		k.area(),
		k.body({ isStatic: true }),
		"wall,",
	])

	const rightWall = k.add([
		k.rect(10, 720),
		k.pos(482, 0),
		k.area(),
		k.body({ isStatic: true }),
		"wall,",
	])

});

k.go("levelOne");

scene("lose", () => {
	add([
		text("Game Over"),
		pos(center()),
		anchor("center"),
		score = 0,
	])

	onKeyPress("space", () => go("levelOne"));
	onClick(() => go("levelOne"));
})

if (player.pos(0))
	k.onKeyDown("a", () => {
		player.move(0, 0)
	})