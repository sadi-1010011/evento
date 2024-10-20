export function getRandomInterval(num: number, min: number) {
    const randomnum = Math.floor(Math.random() * num)
    if (randomnum > min) return randomnum
    else return randomnum + min
}