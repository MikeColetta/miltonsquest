export function createPlayer() {
    const player = add([
        pos(240, 600),
        sprite("bean"),
        area(),
        body(),
        { speed: 300 }
    ])

    onKeyDown("a", () => {
        player.move(-player.speed, 0)
    }),

        onKeyDown("d", () => {
            player.move(player.speed, 0)
        })

    return player
};