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

    const keywords = [
        "hydrogen emission spectrum", "electron probability distribution", "percentage of our universe", "this is the size of an atom",
        "periodic tree of elements", "periodic tree of emissions", "quanta and fields", "waves in an impossible sea", "sonofunctial curves",
        "sonofunctial notation", "chladni resonance field", "spectra website", "sonofunctial typography: oscilla", "2D animation"
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
        searchContainer.classList.remove("active");
        searchResultsDiv.classList.remove("active");
        const query = searchBar.value.toLowerCase();
        searchResults.innerHTML = "";

        if (query.length > 0) {
            const matched = keywords.filter(keyword => keyword.includes(query)).slice(0, 4);
            searchContainer.classList.add("active");
            searchResultsDiv.classList.add("active");

            if (matched.length > 0) {
                const matched = keywords.filter(keyword => keyword.includes(query)).slice(0, 4);
                matched.forEach(word => {
                    const li = document.createElement("li");
                    li.textContent = word;
                    li.textContent = word
                        .toLowerCase()
                        .split(' ')
                        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ');

                    if (word === "hydrogen emission spectrum") {
                        li.classList.add("hydrogen-emission-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "hydrogen-emission-spectrum.html";
                        });
                    } else if (word === "electron probability distribution") {
                        li.classList.add("electron-probability-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "electron-probability-distribution.html";
                        });
                    } else if (word === "percentage of our universe") {
                        li.classList.add("percentage-of-our-universe-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "percentage_of_our_universe.html";
                        });
                    } else if (word === "this is the size of an atom") {
                        li.classList.add("size-of-an-atom-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "this_is_the_size_of_an_atom.html";
                        });
                    } else if (word === "quanta and fields") {
                        li.classList.add("quanta-and-fields-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "quanta_and_fields.html";
                        });
                    } else if (word === "waves in an impossible sea") {
                        li.classList.add("waves-in-an-impossible-sea-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "waves_in_an_impossible_sea.html";
                        });
                    } else if (word === "periodic tree of elements") {
                        li.classList.add("periodic-tree-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "periodic_tree.html";
                        });
                    } else if (word === "periodic tree of emissions") {
                        li.classList.add("periodic-tree-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "periodic_tree.html";
                        });
                    } else if (word === "sonofunctial curves") {
                        li.classList.add("sonofunctial-curves-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "sonofunctial_curves.html";
                        });
                    } else if (word === "sonofunctial notation") {
                        li.classList.add("sonofunctial-notation-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "sonofunctial_notation.html";
                        });
                    } else if (word === "chladni resonance field") {
                        li.classList.add("chladni-resonance-field-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "chladni_resonance_field.html";
                        });
                    } else if (word === "spectra website") {
                        li.classList.add("spectra-website-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "index.html";
                        });
                    } else if (word === "sonofunctial typography: oscilla") {
                        li.classList.add("sonofunctial-typography-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "sonofunctial_typography.html";
                        });
                    } else if (word === "2D animation") {
                        li.classList.add("animation-bg");
                        li.classList.add("search-item-bg");
                        li.addEventListener("click", () => {
                            window.location.href = "2D_animation.html";
                        });
                    }


                    searchResults.appendChild(li);
                });
                searchResults.style.display = "block";
            } else {
                const li = document.createElement("li");
                li.textContent = "No results found.";
                li.style.color = "grey";
                searchResults.appendChild(li);
                searchResults.style.display = "block";
            }
        } else {
            searchResults.style.display = "none";
            if (!isMobileDevice()) {
                const audio = new Audio("audio/Eb2.wav");
                audio.play();
            }
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

    // Audio hover functionality
    const audioHovers = document.querySelectorAll('.audio-hover');
    audioHovers.forEach(audioHover => {
        const video = audioHover.querySelector('video');
        const audioToggle = audioHover.querySelector('.audio-toggle');
        let canUnmute = false;

        audioToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            canUnmute = !canUnmute;
            audioToggle.textContent = canUnmute ? 'Mute' : 'Unmute';

            if (canUnmute) {
                video.muted = false;
                video.play().catch(() => { });
            } else {
                video.muted = true;
            }
        });

        audioHover.addEventListener('mouseenter', () => {
            if (canUnmute) {
                video.muted = false;
                video.play().catch(() => { });
            }
        });

        audioHover.addEventListener('mouseleave', () => {
            video.muted = true;
        });
    });


    // fullscreen hover functionality
    // document.querySelectorAll('.fullscreen-hover').forEach(hover => {
    //     hover.addEventListener('click', function(e) {
    //         // e.stopPropagation(); 
    //         // const gridItem = this.closest('.grid-item');
    //         hover.classList.add('active');
    //     });
    // });
});