/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
let kittenNameTracker = [];

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  let newKitten = ``

  event.preventDefault()

  let form = event.target

  let catName = document.getElementById("add-kitten").value

  let catId = kittens.length

  nameCheck = kittenNameTracker.includes(catName)

  console.log(nameCheck)

  if(nameCheck == false){
    newKitten = {name: catName, mood:"tolerant", affection:"5", id: catId};

    kittens.push(newKitten)

    kittenNameTracker.push(catName)


    saveKittens()
    drawKittens(kittens)

    console.log(kittens)
    console.log(kittens.length)

  } else {
    alert("This cat has already been added.")
  }

  

  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  window.localStorage.setItem("kittenNameTracker", JSON.stringify(kittenNameTracker))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if(kittensData){
    kittens = kittensData
  }
  let kittensNames = JSON.parse(window.localStorage.getItem("kittenNameTracker"))
  if(kittensNames){
    kittenNameTracker = kittensNames
  }
  
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {

  let kittenCard = ``

  kittens.forEach(kittens => {

    kittenCard += `
      <div id="kitten-template${kittens.id}" class="card kitten-card kitten m-1 ${kittens.mood}">
        <div>
          <img id="catIdImg${kittens.id}" class="mb-1" src="https://robohash.org/${kittens.name}?set=set4" alt="kitten">
          <div>
            <span>Name:</span>
            <span id="catIdName${kittens.id}">${kittens.name}</span>
          </div>
          <div>
            <span>Mood:</span>
            <span id="catIdMood${kittens.id}">${kittens.mood}</span>
          </div>
          <div>
            <span>Affection:</span>
            <span id="catIdAffection${kittens.id}">${kittens.affection}</span>
          </div>
          <div class="kitten-btn m-2 p-2">
            <span>
              <button id="catIdPet${kittens.id}" class="m-1 pet-btn" onclick="pet(${kittens.id})">Pet</button>
            </span>
            <span>
              <button id="catIdCatnip${kittens.id}" class="m-1 catnip-btn" onclick="catnip(${kittens.id})">Catnip</button>
            </span>
          </div>
        </div>
      </div>
    `
  })

  document.getElementById("draw-kittens").innerHTML = kittenCard

}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let affectionCheck = Math.random()
  let affectionValue = document.getElementById("catIdAffection" + id).innerHTML
  let moodValue = document.getElementById("catIdMood" + id).innerHTML

  if(affectionCheck <= 0.7){
    affectionValue --
  } else {
    affectionValue++
  }

  if(affectionValue > 5){
    moodValue = "happy"
    if ( !document.getElementById("kitten-template" + id).classList.contains('happy') ){
      document.getElementById("kitten-template" + id).classList.add('happy');
    }
    if ( document.getElementById("kitten-template" + id).classList.contains('tolerant') ){
      document.getElementById("kitten-template" + id).classList.remove('tolerant');
    }
  } else if (affectionValue <= 5 && affectionValue > 3){
    moodValue = "tolerant"
    if ( document.getElementById("kitten-template" + id).classList.contains('angry') ){
      document.getElementById("kitten-template" + id).classList.remove('angry');
    }
    if ( !document.getElementById("kitten-template" + id).classList.contains('tolerant') ){
      document.getElementById("kitten-template" + id).classList.add('tolerant');
    }
  } else if (affectionValue <= 3 && affectionValue > 0){
    moodValue = "angry"
    if ( !document.getElementById("kitten-template" + id).classList.contains('angry') ){
      document.getElementById("kitten-template" + id).classList.add('angry');
    }
    if ( document.getElementById("kitten-template" + id).classList.contains('tolerant') ){
      document.getElementById("kitten-template" + id).classList.remove('tolerant');
    }
  } else if (affectionValue <= 0){
    moodValue = "gone"
    if ( document.getElementById("kitten-template" + id).classList.contains('angry') ){
      document.getElementById("kitten-template" + id).classList.remove('angry');
    }
    if ( !document.getElementById("kitten-template" + id).classList.contains('gone') ){
      document.getElementById("kitten-template" + id).classList.add('gone');
    }
  }

  document.getElementById("catIdMood" + id).innerHTML = moodValue
  document.getElementById("catIdAffection" + id).innerHTML = affectionValue

  kittens[id].mood = moodValue
  kittens[id].affection = affectionValue

  
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  document.getElementById("catIdAffection" + id).innerHTML = 5
  document.getElementById("catIdMood" + id).innerHTML = "tolerant"
  if ( document.getElementById("kitten-template" + id).classList.contains('happy') ){
    document.getElementById("kitten-template" + id).classList.remove('happy');
  }
  if ( document.getElementById("kitten-template" + id).classList.contains('angry') ){
    document.getElementById("kitten-template" + id).classList.remove('angry');
  }
  if ( document.getElementById("kitten-template" + id).classList.contains('gone') ){
    document.getElementById("kitten-template" + id).classList.remove('gone');
  }
  if ( !document.getElementById("kitten-template" + id).classList.contains('tolerant') ){
    document.getElementById("kitten-template" + id).classList.add('tolerant');
  }

  kittens[id].affection = 5
  kittens[id].mood = "tolerant"
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("kittens").classList.remove("hidden");
  loadKittens()
  drawKittens()
}

function clearKittens() {
  localStorage.clear()
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
