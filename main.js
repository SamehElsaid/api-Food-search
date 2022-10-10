const mealSearch = document.querySelector("#mealSearch")
const idMealSearch = document.querySelector("#idMealSearch")
const cardAll = document.querySelector(".cardAll")
const loadignDiv = document.querySelector("#loadign")
const modal = document.querySelector(".modal")
const modalBody = document.querySelector(".modal-body")
const noFound = document.querySelector(".noFound")
const btnClose = document.querySelector(".btn-close")
const prodict = [];
function fetchLinks(url, cb) {
    loading(true)
    fetch(url)
        .then(res => res.json())
        .then(data => cb(data))
        .catch(err => {
            console.log(err);
            noFound.innerHTML = `<h1  style="color:white ;">No Meal Is Found Please Write agian</h1>`
        })
}
idMealSearch.onclick = (ev) => {
    ev.preventDefault()
    if (mealSearch.value != "" && mealSearch.value != " ") {
        fetchLinks("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + mealSearch.value, searchFood)
        mealSearch.value = ""
    }
}
function searchFood(e) {
    loading(false)
    noFound.innerHTML = ""
    cardAll.innerHTML = ""
    e.meals.forEach((meal, i) => {
        prodict[i] = { idMeal: meal.idMeal, strMealThumb: meal.strMealThumb, strMeal: meal.strMeal }
        cardAll.innerHTML += `
                    <div class="card" id="${meal.idMeal}">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                        </div>
                    </div>`
    })
    localStorage.setItem("proJson", JSON.stringify(prodict))
    let cards = document.querySelectorAll(".card")
    cards.forEach((card) => {
        card.onclick = () => {
            let cardId = card.id
            fetchLinks("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + cardId, idInfo)
        }
    })
}
function loading(status) {
    status ? loadignDiv.style.display = "block" : loadignDiv.style.display = "none"
}
if (localStorage.getItem("proJson")) {
    let myProd = JSON.parse(localStorage.getItem("proJson"))
    myProd.forEach((e) => {
        cardAll.innerHTML += `
                    <div class="card" id="${e.idMeal}">
                        <img src="${e.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${e.strMeal}</h5>
                        </div>
                    </div>`
    })
    let cards = document.querySelectorAll(".card")
    cards.forEach((card) => {
        card.onclick = () => {
            let cardId = card.id
            fetchLinks("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + cardId, idInfo)
        }
    })
}
function idInfo(e) {
    loading(false)
    let nameFood = e.meals[0].strMeal
    let ytFood = e.meals[0].strYoutube
    let imgFood = e.meals[0].strMealThumb
    let pFood = e.meals[0].strInstructions
    modal.style.display = "block"
    modalBody.innerHTML = `
                    <h5 class="modal-title">${nameFood}</h5>
                    <img src="${imgFood}" class="card-img-top" alt="...">
                    <p class="modal-title">${pFood}</p>
                    <a href="${ytFood}" target="_blank" class="btn btn-primary">Go To You Tube</a>
                    `
}
btnClose.onclick = () => {
    modal.style.display = "none"
}

