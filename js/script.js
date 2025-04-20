document.addEventListener('DOMContentLoaded', function () {

    const menuIconDiv = document.getElementById('menu-icon-div');
    const menuContainer = document.getElementById('menu-container');
    const header = document.getElementById('header');
    let fullscreen = false;

    header.style.height = 'var(--header-height)';
    header.style.background = 'rgba(255, 255, 255, 0.7)';
    document.body.style.overflow = '';

    menuIconDiv.addEventListener('click', () => {
        fullscreen = !fullscreen;
        header.style.height = fullscreen ? '100vh' : 'var(--header-height)';
        header.style.background = fullscreen ? 'rgba(255, 255, 255, 0.8)' : '';
        const isVisible = menuContainer.classList.contains("visible");

        const nonMenuDivs = document.querySelectorAll('.non-menu-item');
        nonMenuDivs.forEach(div => {
            div.style.opacity = fullscreen ? '0' : '1';
            div.style.pointerEvents = fullscreen ? 'none' : 'all';
        });

        if (isVisible) {
            menuContainer.classList.remove("visible");
        } else {
            menuContainer.classList.add("visible");
        }

        document.body.style.overflow = fullscreen ? 'hidden' : '';
    });

    // Search bar functionality
    const searchIconDiv = document.getElementById("search-icon-div");
    const searchBar = document.getElementById("search-bar");
    const searchResults = document.getElementById("search-results");

    let noResultsFound = false;

    const keywords = [
        "light", "sound", "hydrogen", "spectrum", "interactive", "installation",
        "video", "poster", "chladni", "resonance", "motion", "about", "xander munc", "quanta and fields"
    ];

    searchIconDiv.addEventListener("click", () => {
        fullscreen = !fullscreen;
        header.style.height = fullscreen ? '100vh' : 'var(--header-height)';
        header.style.background = fullscreen ? 'rgba(255, 255, 255, 0.8)' : '';
        const isVisible = searchBar.classList.contains("visible");

        const nonSearchDivs = document.querySelectorAll('.non-searchbar-item');
        nonSearchDivs.forEach(div => {
            div.style.opacity = fullscreen ? '0' : '1';
            div.style.pointerEvents = fullscreen ? 'none' : 'all';
        });

        if (isVisible) {
            searchBar.classList.remove("visible");
            document.getElementById('chladni').classList.remove("visible");
            const searchContainer = document.getElementById("search-container");
            const searchResultsDiv = document.getElementById("search-results");
            searchContainer.classList.remove("active");
            searchResultsDiv.classList.remove("active");
            searchResults.style.display = "none";
            searchBar.value = "";
        } else {
            searchBar.classList.add("visible");
            document.getElementById('chladni').classList.add("visible");
        }

        searchResults.style.display = "none";
        searchBar.value = "";

        document.body.style.overflow = fullscreen ? 'hidden' : '';
    });

    searchBar.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const query = searchBar.value.trim();
            if (query.length === 0) return;

            if (!noResultsFound) {
                document.getElementById("search-container").classList.add("active");
                document.getElementById("search-results").classList.add("active");
                if (!isMobileDevice()) {
                    const audio = new Audio("audio/F2.wav");
                    audio.play();
                }
            }
        }
    });

    function isMobileDevice() {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    const clickSound = new Audio("audio/Click.wav");

    searchBar.addEventListener("input", () => {
        if (!isMobileDevice()) {
            clickSound.currentTime = 0;
            clickSound.play();
        }

        const searchContainer = document.getElementById("search-container");
        const searchResultsDiv = document.getElementById("search-results");

        const wasActive = searchContainer.classList.contains("active") || searchResultsDiv.classList.contains("active");

        searchContainer.classList.remove("active");
        searchResultsDiv.classList.remove("active");

        if (wasActive) {
            if (!isMobileDevice()) {
                const audio = new Audio("audio/Eb2.wav");
                audio.play();
            }
        }

        const query = searchBar.value.toLowerCase();
        searchResults.innerHTML = "";

        if (query.length > 0) {
            const matched = keywords.filter(keyword => keyword.includes(query));

            if (matched.length > 0) {
                matched.forEach(word => {
                    const li = document.createElement("li");
                    li.textContent = word;

                    if (word === "interactive") {
                        li.classList.add("interactive-bg");
                    } else if (word === "installation") {
                        li.classList.add("installation-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "hes.html";
                        });
                    } else if (word === "quanta and fields") {
                        li.classList.add("quanta-and-fields-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "hes.html";
                        });
                    }

                    searchResults.appendChild(li);
                });
                searchResults.style.display = "block";
                noResultsFound = false;
            } else {
                const li = document.createElement("li");
                li.textContent = "No results found.";
                li.style.color = "grey";
                searchResults.appendChild(li);
                searchResults.style.display = "block";
                noResultsFound = true;
            }
        } else {
            searchResults.style.display = "none";
        }
    });

    let soundOne = true;

    document.getElementById("search-icon").addEventListener("click", () => {
        if (soundOne) {
            if (!isMobileDevice()) {
                const audio = new Audio("audio/F2.wav");
                audio.play();
            }
        } else {
            if (!isMobileDevice()) {
                const audio = new Audio("audio/C2.wav");
                audio.play();
            }
        }
        soundOne = !soundOne;
    });

    document.getElementById("menu-icon").addEventListener("click", () => {
        if (soundOne) {
            if (!isMobileDevice()) {
                const audio = new Audio("audio/F2.wav");
                audio.play();
            }
        } else {
            if (!isMobileDevice()) {
                const audio = new Audio("audio/C2.wav");
                audio.play();
            }
        }
        soundOne = !soundOne;
    });

    searchResults.addEventListener('wheel', function (e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            searchResults.scrollLeft += e.deltaY;
        }
    }, { passive: false });

});
