
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve the Art Gallery page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Sample artwork data
let artworks = [
    {
        id: 1,
        title: 'The Starry Night',
        artist: 'Vincent van Gogh',
        category: 'Painting',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600'
    },
    {
        id: 2,
        title: 'Abstract Colors',
        artist: 'Modern Artist',
        category: 'Abstract',
        price: 18000,
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600'
    },
    {
        id: 3,
        title: 'Classic Portrait',
        artist: 'Gallery Collection',
        category: 'Portrait',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=600'
    }
];

// GET: Retrieve all artworks
app.get('/api/artworks', (req, res) => {
    res.status(200).json({
        success: true,
        count: artworks.length,
        data: artworks
    });
});

// POST: Add a new artwork
app.post('/api/artworks', (req, res) => {
    const { title, artist, category, price, image } = req.body;

    if (!title || !artist || !category || price === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Please provide title, artist, category and price.'
        });
    }

    const newArtwork = {
        id: Date.now(),
        title,
        artist,
        category,
        price: Number(price),
        image: image || ''
    };

    artworks.push(newArtwork);

    res.status(201).json({
        success: true,
        message: 'Artwork added successfully!',
        data: newArtwork
    });
});

// 404 error handling
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found.'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`ArtVista server running at http://localhost:${PORT}`);
});
