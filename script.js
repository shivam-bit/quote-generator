const quoteContainer=document.getElementById('quote-container')
const quoteText=document.getElementById('quote')
const authorText=document.getElementById('author')
const twitterButton=document.getElementById('twitter')
const newQuoteButton=document.getElementById('quote-container')
const loader=document.getElementById('loader')

// show loading
function loading(){
    loader.hidden= false
    quoteContainer.hidden = true
}
// Hide loading
function complete(){
    if (!loader.hidden){
        quoteContainer.hidden = false
        loader.hidden = true
    }
}
// Get quote from API
async function getQuote(){
    loading()

    const proxyURL='https://cors-anywhere.herokuapp.com/'
    const baseURL='api.quotable.io/random';
    // const baseURL= 'https://random-quote-generator.herokuapp.com/api/quotes/random'
    try {
        const response= await fetch(proxyURL+baseURL);
        const data=await response.json()
        // if author is blank add unknown
        if (data.author===''){
            authorText.innerText='Unknown';
        }else {
            authorText.innerText='- '+data.author;
        }
        // Reduce font size for long quotes
        if (data.content.length>50){
             quoteText.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText=data.quoteText;
        complete()
        console.log(data)
    }catch(error) {
        getQuote()
        console.log("ohh hoo ", error)
    }

}
// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText
    const author =authorText.innerText
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl,'_blank');
}
// Event Listners
newQuoteButton.addEventListener('click',getQuote)
twitterButton.addEventListener('click',tweetQuote)
// onload
getQuote()
loading()
