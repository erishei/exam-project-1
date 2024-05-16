const callUrl = "https://v2.api.noroff.dev/blog/posts/ericasheidai/"
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
const combinedURL = callUrl+postId
console.log(combinedURL)

function generateData(){
    fetch(combinedURL)
        .then(response => console.log(response.json))
}

generateData()
