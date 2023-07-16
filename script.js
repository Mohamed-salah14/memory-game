// Selecting Elements
let memoryCardsContainer = document.querySelector(".memory-blocks");
let memoryCards = Array.from(
  document.querySelectorAll(".memory-blocks .game-block")
);

// Set Options
// Set Card Duration
let duration = 1000;

// Create Range From Blocks Array
let orderRange = [...Array(memoryCards.length).keys()];

// Wrong Tries
let wrongTries = 1;

// On Clicking Span Element
document
  .querySelector(".control-buttons span")
  .addEventListener("click", () => {
    // Prompt Window For Name
    let userName = prompt("Enter your Name");
    // Check If User Name Is Valid Or Invalid
    if (userName == "" || userName == null) {
      document.querySelector(".game-info .name span").innerHTML = "Unknown";
    } else {
      document.querySelector(".game-info .name span").innerHTML = userName;
    }
    // Remove Control Buttons from DOM
    document.querySelector(".control-buttons").remove();
  });

// Shuffle Function
shuffle(orderRange);

// Loop On Cards
memoryCards.forEach((card, index) => {
  // Add Order CSS Property To Blocks
  card.style.order = orderRange[index];

  // Add Click Event To Card
  card.addEventListener("click", (e) => {
    // Add Class To Clicked Card
    e.currentTarget.classList.add("clicked");

    // Collect All Flip Cards
    let allFlipedBlocks = memoryCards.filter((card) =>
      card.classList.contains("clicked")
    );

    // If There Is Two Selected Blocks
    if (allFlipedBlocks.length === 2) {
      stopClicking();
      isMatched(allFlipedBlocks[0], allFlipedBlocks[1]);
    }
    let matchedBlocks = memoryCards.filter((card) =>
      card.classList.contains("matched")
    );
    if (matchedBlocks.length === memoryCards.length) {
      results();
    }
  });
});

// Stop Clicking Function After Flipping Two Blocks

function stopClicking() {
  memoryCards.forEach((card) => {
    card.style.pointerEvents = "none";
    setTimeout(() => {
      card.style.pointerEvents = "auto";
    }, duration);
  });
}

// Check if the Blocks Are Matched
function isMatched(firstBlock, secondBlock) {
  // Select Wrong Tries Element
  let triesElement = document.querySelector(".wrong span");
  // Check If First BLock Equals To Second Block
  if (firstBlock.dataset.mix === secondBlock.dataset.mix) {
    // Remove Clicked CLass
    firstBlock.classList.remove("clicked");
    secondBlock.classList.remove("clicked");

    // Add Matched Class
    firstBlock.classList.add("matched");
    secondBlock.classList.add("matched");

    // pLay Success Sound
    document.getElementById("success").play();
  } else {
    // Increse Tries Count On Failure
    triesElement.innerHTML = parseInt(wrongTries++);
    setTimeout(() => {

      // Remove Clicked Class
      firstBlock.classList.remove("clicked");
      secondBlock.classList.remove("clicked");
    }, duration);
    // Play Failed Sound
    document.getElementById("fail").play();
  }
}

// Shuffle Function
function shuffle(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let j = Math.round(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function results() {
  // Remove All Elements
  memoryCardsContainer.remove();
  document.querySelector(".game-info").remove();

  // Create Results Element
  let results = document.createElement("div");

  // Add Class To Results
  results.className = "results";

  // Check Levels
  if (wrongTries < 5) {
    results.innerHTML = `Congrats! Your Wrong Attempts Is ${wrongTries - 1}, Perfect!`;
  } else if (wrongTries > 5 && wrongTries <= 12) {
    results.innerHTML = `Congrats! Your Wrong Attempts Is ${wrongTries - 1}, Good!`;
  } else {
    results.innerHTML = `Congrats! Your Wrong Attempts Is ${wrongTries - 1}, Bad..`;
  }
  
  // Append the results to the Body
  document.body.appendChild(results);
}
