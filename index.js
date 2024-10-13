import { defaultValues } from "./constants/defaultValues.Js"

let gem = document.querySelector('.gem-cost')
let parsedGem = parseFloat(gem.innerHTML)

let gpcText = document.getElementById("gpc-text")
let gpsText = document.getElementById("gps-text")

let gemImageContainer = document.querySelector('.gem-img-container')

let gpc = 1

let gps = 0

const upgrades = [
    {
        name: 'clicker',
        cost: document.querySelector('.clicker-cost'),
        pasredCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        increase: document.querySelector(".clicker-increase"),
        parsedIncrease: parseFloat(document.querySelector(".clicker-increase").innerHTML),
        level: document.querySelector(".clicker-level"),
        gemMultiplier: 1.025,
        costMultiplier: 1.12,
    },
    {
        name: 'pickaxe',
        cost: document.querySelector('.pickaxe-cost'),
        pasredCost: parseFloat(document.querySelector('.pickaxe-cost').innerHTML),
        increase: document.querySelector(".pickaxe-increase"),
        parsedIncrease: parseFloat(document.querySelector(".pickaxe-increase").innerHTML),
        level: document.querySelector(".pickaxe-level"),
        gemMultiplier: 1.03,
        costMultiplier: 1.115,
    },
    {
        name: 'miner',
        cost: document.querySelector('.miner-cost'),
        pasredCost: parseFloat(document.querySelector('.miner-cost').innerHTML),
        increase: document.querySelector(".miner-increase"),
        parsedIncrease: parseFloat(document.querySelector(".miner-increase").innerHTML),
        level: document.querySelector(".miner-level"),
        gemMultiplier: 1.035,
        costMultiplier: 1.11,
    },
    {
        name: 'factory',
        cost: document.querySelector('.factory-cost'),
        pasredCost: parseFloat(document.querySelector('.factory-cost').innerHTML),
        increase: document.querySelector(".factory-increase"),
        parsedIncrease: parseFloat(document.querySelector(".factory-increase").innerHTML),
        level: document.querySelector(".factory-level"),
        gemMultiplier: 1.04,
        costMultiplier: 1.10,
    }

]

function createUpgrades () {
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent

    defaultValues.forEach((obj) => {
       let html = template;

       Object.keys(obj).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, obj[key])
       })

       upgradesContainer.innerHTML += html

    })
}

createUpgrades()

function incrementGem(event) {
    gem.innerHTML = Math.round(parsedGem += gpc)

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement("div")
    div.innerHTML = `+${Math.round(gpc)}`
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
    gemImageContainer.appendChild(div)

    div.classList.add('fade-up')

    timeout(div)
}

const timeout = (div) => {
    setTimeout(() => {
        div.remove()
    }, 800)
}

function buyUpgrade(upgrade) {
    const mu = upgrades.find((u) => {
        if (u.name === upgrade) return u
    })

    if (parsedGem >= mu.pasredCost) {
        gem.innerHTML = Math.round(parsedGem -= mu.pasredCost)

        mu.level.innerHTML++

        mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.gemMultiplier).toFixed(2))
        mu.increase.innerHTML = mu.parsedIncrease

        mu.pasredCost *= mu.costMultiplier
        mu.cost.innerHTML = Math.round(mu.pasredCost)

        if (mu.name === 'clicker') {
            gpc += mu.parsedIncrease
        } else {
            gps += mu.parsedIncrease
        }
    }
}

function save () {
    localStorage.clear()

    upgrades.map((upgrade) => {

        const obj = JSON.stringify({
            parsedlevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.pasredCost,
            parsedIncrease: upgrade.parsedIncrease,
        })

        localStorage.setItem(upgrade.name, obj)

    })
    
    localStorage.setItem('gpc', JSON.stringify(gpc))
    localStorage.setItem('gps', JSON.stringify(gps))
    localStorage.setItem('gem', JSON.stringify(parsedGem))
}

function load (){
    upgrades.map((upgrade) => {
        const savedValues =JSON.parse(localStorage.getItem(upgrade.name))

        upgrade.pasredCost = savedValues.parsedCost
        upgrade.parsedIncrease = savedValues.parsedIncrease

        upgrade.level.innerHTML = savedValues.parsedlevel
        upgrade.cost.innerHTML = Math.round(upgrade.pasredCost)
        upgrade.increase.innerHTML = upgrade.parsedIncrease

    })

    gpc = JSON.parse(localStorage.getItem('gpc'))
    gps = JSON.parse(localStorage.getItem('gps'))
    parsedGem = JSON.parse(localStorage.getItem('gem'))

    gem.innerHTML = Math.round(parsedGem)
}

setInterval(() => {
    parsedGem += gps / 10
    gem.innerHTML = Math.round(parsedGem)
    gpcText.innerHTML = Math.round(gpc)
    gpsText.innerHTML = Math.round(gps);
}, 100)   

window.incrementGem = incrementGem
window.buyUpgrade = buyUpgrade
window.save = save
window.load = load