const contentElement = document.getElementById("content");
const authorElement = document.getElementById("author");
const tagsElement = document.getElementById("tags");
const generateButtonElement = document.getElementById("generate");
const copyButtonElement = document.getElementById("copy");

let currentQuoteData = null;

function setCurrentQuote() {
  const { author, content, tags } = currentQuoteData;
  tagsElement.innerHTML = "";
  contentElement.innerText = `"${content}"`;
  authorElement.innerText = author;

  for (let tag of tags) {
    const tagElement = document.createElement("div");
    tagElement.classList.add("tag");
    tagElement.innerText = tag;
    tagsElement.appendChild(tagElement);
  }
}

function GETRandomQuote() {
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      const { author, content, tags } = data;
      currentQuoteData = { author, content, tags };
      setCurrentQuote();
    })
    .catch((error) => {
      console.log(error);
    });
}

generateButtonElement.addEventListener("click", () => {
  GETRandomQuote();
});

copyButtonElement.addEventListener("click", () => {
  navigator.clipboard.writeText(currentQuoteData.content);
});
