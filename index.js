import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL:
    "https://endorsmentlist-default-rtdb.asia-southeast1.firebasedatabase.app/",
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsmentListInDB = ref(database, "endorsmentList")

const inputFieldEl = document.getElementById("input-field")
const publishButtonEL = document.getElementById("publish-button")
const endorsmentListEl = document.getElementById("endorsment-list")

publishButtonEL.addEventListener("click", function () {
  let inputValue = inputFieldEl.value

  push(endorsmentListInDB, inputValue)
  clearInputFieldEl()
})

onValue(endorsmentListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let commentsArray = Object.entries(snapshot.val())

    clearEndorsmentListEl()

    for (let i = 0; i < commentsArray.length; i++) {
      let currentComment = commentsArray[i]
      let currentCommentID = currentComment[0]
      let currentCommentValue = currentComment[1]

      appendItemToEndorsmentListEl(currentComment)
    }
  } else {
    endorsmentListEl.innerHTML = "no item here ...yet"
  }
})

function clearEndorsmentListEl() {
  endorsmentListEl.innerHTML = ""
}

function clearInputFieldEl() {
  inputFieldEl.value = ""
}

function appendItemToEndorsmentListEl(comment) {
  let commentID = comment[0]
  let commentValue = comment[1]

  let newEl = document.createElement("li")
  newEl.textContent = commentValue

  newEl.addEventListener("click", function () {
    let exactLocationOfCommentInDB = ref(
      database,
      `endorsmentList/${commentID}`
    )
    remove(exactLocationOfCommentInDB)
  })
  endorsmentListEl.append(newEl)
}

/*

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-df319-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    // Challenge: Change the onValue code so that it uses snapshot.exists() to show items when there are items in the database and if there are not displays the text 'No items here... yet'.
    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
    
    
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}
*/
