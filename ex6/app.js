// ==========================================
// ART GALLERY MANAGEMENT SYSTEM
// JavaScript Functions
// ==========================================


// 1. CREATE INITIAL ARTWORK DATA

const starterArtworks = [

    {
        id: 1,
        title: "The Quiet Bloom",
        artist: "Maya Laurent",
        category: "Painting",
        year: 2024,
        favorite: false,
        description: "A beautiful study of colours and flowers.",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900"
    },

    {
        id: 2,
        title: "Golden Hour",
        artist: "Ethan Cole",
        category: "Photography",
        year: 2023,
        favorite: true,
        description: "A beautiful landscape captured during sunset.",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900"
    },

    {
        id: 3,
        title: "Fragments of Form",
        artist: "Nina Okafor",
        category: "Sculpture",
        year: 2025,
        favorite: false,
        description: "An abstract exploration of shape and balance.",
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=900"
    },

    {
        id: 4,
        title: "Blue Reverie",
        artist: "Leo Martin",
        category: "Painting",
        year: 2022,
        favorite: false,
        description: "A dreamlike painting inspired by the ocean.",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900"
    },

    {
        id: 5,
        title: "Urban Geometry",
        artist: "Ava Chen",
        category: "Photography",
        year: 2024,
        favorite: false,
        description: "An architectural composition celebrating lines.",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900"
    },

    {
        id: 6,
        title: "Digital Garden",
        artist: "Noah Rivera",
        category: "Digital",
        year: 2025,
        favorite: true,
        description: "A vibrant digital artwork inspired by nature.",
        image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=900"
    }

];


// 2. APPLICATION STATE

let artworks = loadArtworks();

let currentCategory = "All";

let searchText = "";


// 3. HTML ELEMENT REFERENCES

const galleryGrid = document.getElementById("galleryGrid");

const searchInput = document.getElementById("searchInput");

const artworkCount = document.getElementById("artworkCount");

const resultCount = document.getElementById("resultCount");

const emptyState = document.getElementById("emptyState");

const galleryHeading = document.getElementById("galleryHeading");


// ==========================================
// FUNCTION 1: CREATE ARTWORK
// ==========================================

function createArtwork(title, artist, category, image, description) {

    return {

        id: Date.now(),

        title: title,

        artist: artist,

        category: category,

        image: image,

        description: description || "No description available.",

        year: new Date().getFullYear(),

        favorite: false

    };

}


// ==========================================
// FUNCTION 2: LOAD ARTWORKS
// ==========================================

function loadArtworks() {

    const savedArtworks = localStorage.getItem("atelier-artworks");

    if (savedArtworks) {

        return JSON.parse(savedArtworks);

    }

    return starterArtworks;

}


// ==========================================
// FUNCTION 3: SAVE AND RENDER
// ==========================================

function saveAndRender() {

    localStorage.setItem(
        "atelier-artworks",
        JSON.stringify(artworks)
    );

    renderGallery();

}


// ==========================================
// FUNCTION 4: ADD ARTWORK
// ==========================================

function addArtwork(artwork) {

    artworks.push(artwork);

    saveAndRender();

}


// ==========================================
// FUNCTION 5: TOGGLE FAVOURITE
// Uses map()
// ==========================================

function toggleFavorite(id) {

    artworks = artworks.map(artwork => {

        if (artwork.id === id) {

            return {

                ...artwork,

                favorite: !artwork.favorite

            };

        }

        return artwork;

    });

    saveAndRender();

}


// ==========================================
// FUNCTION 6: DELETE ARTWORK
// Uses filter()
// ==========================================

function deleteArtwork(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this artwork?"
    );

    if (!confirmDelete) {

        return;

    }

    artworks = artworks.filter(artwork => {

        return artwork.id !== id;

    });

    saveAndRender();

}


// ==========================================
// FUNCTION 7: FILTER ARTWORKS
// Uses filter()
// ==========================================

function getVisibleArtworks() {

    return artworks.filter(artwork => {

        const matchesCategory =

            currentCategory === "All" ||

            (currentCategory === "Favourites" &&
                artwork.favorite) ||

            artwork.category === currentCategory;


        const searchableText =

            `${artwork.title} ${artwork.artist} ${artwork.category}`
                .toLowerCase();


        const matchesSearch =

            searchableText.includes(searchText.toLowerCase());


        return matchesCategory && matchesSearch;

    });

}


// ==========================================
// FUNCTION 8: COUNT ARTWORKS
// ==========================================

function countArtworks() {

    return artworks.length;

}


// ==========================================
// FUNCTION 9: CREATE ARTWORK CARD
// ==========================================

function artworkCard(artwork) {

    return `

        <div class="col-sm-6 col-lg-4">

            <article class="art-card">

                <div class="art-image-wrap">

                    <img
                        class="art-image"
                        src="${escapeHTML(artwork.image)}"
                        alt="${escapeHTML(artwork.title)}"
                        onerror="this.src='https://placehold.co/800x900/e8e3da/514b43?text=Artwork'"
                    >

                    <div class="art-overlay"></div>


                    <button
                        class="favorite-btn ${artwork.favorite ? "is-favorite" : ""}"
                        data-action="favorite"
                        data-id="${artwork.id}"
                        aria-label="Toggle favourite">

                        ${artwork.favorite ? "♥" : "♡"}

                    </button>


                    <button
                        class="view-btn"
                        data-action="view"
                        data-id="${artwork.id}">

                        View Artwork ↗

                    </button>

                </div>


                <div class="art-meta">

                    <div class="art-category">

                        ${escapeHTML(artwork.category)}
                        · ${artwork.year}

                    </div>

                    <h3 class="art-title">

                        ${escapeHTML(artwork.title)}

                    </h3>

                    <div class="art-artist">

                        By ${escapeHTML(artwork.artist)}

                    </div>

                </div>

            </article>

        </div>

    `;

}


// ==========================================
// FUNCTION 10: RENDER GALLERY
// Uses forEach()
// ==========================================

function renderGallery() {

    const visibleArtworks = getVisibleArtworks();

    galleryGrid.innerHTML = "";


    visibleArtworks.forEach(artwork => {

        galleryGrid.insertAdjacentHTML(
            "beforeend",
            artworkCard(artwork)
        );

    });


    artworkCount.textContent = countArtworks();


    resultCount.textContent =

        visibleArtworks.length + " Artworks";


    const noResults = visibleArtworks.length === 0;


    emptyState.classList.toggle("d-none", !noResults);

    galleryGrid.classList.toggle("d-none", noResults);


    if (currentCategory === "Favourites") {

        galleryHeading.textContent = "Your Favourite Artworks";

    }

    else if (currentCategory === "All") {

        galleryHeading.textContent = "Featured Artworks";

    }

    else {

        galleryHeading.textContent =
            currentCategory + " Collection";

    }

}


// ==========================================
// FUNCTION 11: VIEW ARTWORK DETAILS
// ==========================================

function showArtworkDetails(id) {

    const artwork = artworks.find(item => item.id === id);

    if (!artwork) {

        return;

    }


    document.getElementById("detailContent").innerHTML = `

        <div class="row g-0">

            <div class="col-md-6">

                <img
                    class="detail-image"
                    src="${escapeHTML(artwork.image)}"
                    alt="${escapeHTML(artwork.title)}"
                >

            </div>


            <div class="col-md-6 detail-copy">

                <p class="eyebrow">

                    ${escapeHTML(artwork.category)}
                    · ${artwork.year}

                </p>


                <h2>

                    ${escapeHTML(artwork.title)}

                </h2>


                <p>

                    Created by
                    <strong>${escapeHTML(artwork.artist)}</strong>

                </p>


                <p>

                    ${escapeHTML(artwork.description)}

                </p>


                <div class="d-flex flex-wrap gap-2 mt-4">

                    <button
                        class="btn btn-dark rounded-pill"
                        data-action="favorite"
                        data-id="${artwork.id}">

                        ${artwork.favorite ?
                            "♥ Remove Favourite" :
                            "♡ Add to Favourites"}

                    </button>


                    <button
                        class="btn btn-outline-danger rounded-pill"
                        data-action="delete"
                        data-id="${artwork.id}">

                        Delete Artwork

                    </button>

                </div>

            </div>

        </div>

    `;


    bootstrap.Modal.getOrCreateInstance(

        document.getElementById("detailModal")

    ).show();

}


// ==========================================
// FUNCTION 12: ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, char => ({

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#39;"

    })[char]);

}


// ==========================================
// EVENT 1: SEARCH ARTWORKS
// ==========================================

searchInput.addEventListener("input", function(event) {

    searchText = event.target.value.trim();

    renderGallery();

});


// ==========================================
// EVENT 2: FAVOURITE AND VIEW BUTTONS
// ==========================================

galleryGrid.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) {

        return;

    }


    const id = Number(button.dataset.id);

    const action = button.dataset.action;


    if (action === "favorite") {

        toggleFavorite(id);

    }


    if (action === "view") {

        showArtworkDetails(id);

    }

});


// ==========================================
// EVENT 3: CATEGORY FILTER
// ==========================================

document.getElementById("filterButtons")

    .addEventListener("click", function(event) {

        const button = event.target.closest("button[data-category]");

        if (!button) {

            return;

        }


        currentCategory = button.dataset.category;


        document.querySelectorAll(".filter-btn").forEach(btn => {

            btn.classList.toggle("active", btn === button);

        });


        renderGallery();

    });


// ==========================================
// EVENT 4: ADD ARTWORK FORM
// ==========================================

document.getElementById("artworkForm")

    .addEventListener("submit", function(event) {

        event.preventDefault();


        const title = document.getElementById("titleInput").value.trim();

        const artist = document.getElementById("artistInput").value.trim();

        const category = document.getElementById("categoryInput").value;

        const image = document.getElementById("imageInput").value.trim();

        const description = document.getElementById("descriptionInput").value.trim();


        const artwork = createArtwork(

            title,

            artist,

            category,

            image,

            description

        );


        addArtwork(artwork);


        this.reset();


        bootstrap.Modal.getOrCreateInstance(

            document.getElementById("addModal")

        ).hide();

    });


// ==========================================
// EVENT 5: RESET FILTERS
// ==========================================

document.getElementById("resetButton")

    .addEventListener("click", function() {

        currentCategory = "All";

        searchText = "";

        searchInput.value = "";


        document.querySelectorAll(".filter-btn").forEach(btn => {

            btn.classList.toggle(
                "active",
                btn.dataset.category === "All"
            );

        });


        renderGallery();

    });


// ==========================================
// EVENT 6: ARTWORK DETAILS ACTIONS
// ==========================================

document.getElementById("detailContent")

    .addEventListener("click", function(event) {

        const button = event.target.closest("button[data-action]");

        if (!button) {

            return;

        }


        const id = Number(button.dataset.id);

        const action = button.dataset.action;


        if (action === "favorite") {

            toggleFavorite(id);

            showArtworkDetails(id);

        }


        if (action === "delete") {

            bootstrap.Modal.getOrCreateInstance(

                document.getElementById("detailModal")

            ).hide();


            deleteArtwork(id);

        }

    });


// ==========================================
// START APPLICATION
// ==========================================

renderGallery();