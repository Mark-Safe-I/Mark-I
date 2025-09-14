const apiKey = "YOUR_YOUAIzaSyD7wuChi98jDkM2M7nTIKNl1nN238n1-5QTUBE_API_KEY"; // Replace with your API key
const blockedWords = ["badword1", "badword2", "inappropriate"]; // Add more blocked terms

function safeSearch() {
    const query = document.getElementById("searchInput").value.toLowerCase();

    // Check for inappropriate terms
    for (let word of blockedWords) {
        if (query.includes(word)) {
            alert("Your search contains inappropriate terms! Please try again.");
            return;
        }
    }

    // Fetch YouTube videos
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=5`)
        .then(response => response.json())
        .then(data => displayResults(data.items))
        .catch(err => console.error(err));
}

function displayResults(videos) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    videos.forEach(video => {
        const videoDiv = document.createElement("div");
        videoDiv.className = "video";
        videoDiv.innerHTML = `
            <h3>${video.snippet.title}</h3>
            <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
            </a>
        `;
        resultsDiv.appendChild(videoDiv);
    });
}
