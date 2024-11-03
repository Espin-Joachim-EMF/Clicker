let gem = document.querySelector(".gem-cost")
let parsedGem = parseFloat(gem.innerHTML)

let clickerCost = document.querySelector(".clicker-cost")
let parsedClickerCost = parseFloat(clickerCost.innerHTML)
let clickerLevel = document.querySelector(".clicker-level")
let clickerIncrease = document.querySelector(".clicker-increase")
let parsedClickerIncrease = parseFloat(clickerIncrease.innerHTML)

let pickaxeCost = document.querySelector(".pickaxe-cost")
let parsedPickaxeCost = parseFloat(pickaxeCost.innerHTML)
let pickaxeLevel = document.querySelector(".pickaxe-level")
let pickaxeIncrease = document.querySelector(".pickaxe-increase")
let parsedPickaxeIncrease = parseFloat(pickaxeIncrease.innerHTML)

let minerCost = document.querySelector(".miner-cost")
let parsedMinerCost = parseFloat(minerCost.innerHTML)
let minerLevel = document.querySelector(".miner-level")
let minerIncrease = document.querySelector(".miner-increase")
let parsedMinerIncrease = parseFloat(minerIncrease.innerHTML)

let gpcText = document.getElementById("gpc-text")
let gpsText = document.getElementById("gps-text")

let gemImgContainer = document.querySelector('.gem-img-container')

let gpc = 1
let gps = 0

function incrementgem(event) {
    gem.innerHTML = Math.round(parsedGem += gpc)

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(gpc)}`
    div.style.cssText =`color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
    gemImgContainer.appendChild(div)

    div.classList.add('fade-up')

    timeout(div)
}

const timeout = (div) => {
    setTimeout(() =>{
        div.remove()
    },800)
}

function buyClicker() {
    if (parsedGem >= parsedClickerCost) {
        gem.innerHTML = Math.round(parsedGem -= parsedClickerCost)

        clickerLevel.innerHTML++

        parsedClickerIncrease = parseFloat((parsedClickerIncrease * 1.03).toFixed(2))
        clickerIncrease.innerHTML = parsedClickerIncrease
        gpc += parsedClickerIncrease

        parsedClickerCost *= 1.15
        clickerCost.innerHTML = Math.round(parsedClickerCost)
    }
}

function buyPickaxe() {
    if (parsedGem >= parsedPickaxeCost) {
        gem.innerHTML = Math.round(parsedGem -= parsedPickaxeCost)

        pickaxeLevel.innerHTML++

        parsedPickaxeIncrease = parseFloat((parsedPickaxeIncrease * 1.08).toFixed(2))
        pickaxeIncrease.innerHTML = parsedPickaxeIncrease
        gps += parsedPickaxeIncrease

        parsedPickaxeCost *= 1.15
        pickaxeCost.innerHTML = Math.round(parsedPickaxeCost)
    }
}

function buyMiner() {
    if (parsedGem >= parsedMinerCost) {
        gem.innerHTML = Math.round(parsedGem -= parsedMinerCost)

        minerLevel.innerHTML++

        parsedMinerIncrease = parseFloat((parsedMinerIncrease * 1.13).toFixed(2))
        minerIncrease.innerHTML = parsedMinerIncrease
        gps += parsedMinerIncrease

        parsedMinerCost *= 1.15
        minerCost.innerHTML = Math.round(parsedMinerCost)
    }
}

setInterval(() =>{
parsedGem += gps / 10
gem.innerHTML = Math.round(parsedGem)
gpcText.innerHTML = Math.round(gpc)
gpsText.innerHTML = Math.round(gps)
}, 100)