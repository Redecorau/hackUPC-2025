const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/scrape-image', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing URL');
  
    try {
      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
  
      const $ = cheerio.load(data);
      const images = $('img.media-image__image.media__wrapper--media');
  
      let imageUrl = null;
  
      images.each((i, img) => {
        const src = $(img).attr('src');
        if (src && !imageUrl) {
          imageUrl = src.startsWith('https') ? src : `https:${src}`;
        }
      });
  
      if (imageUrl) {
        res.json({ imageUrl });
      } else {
        res.status(404).send('No image found');
      }
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Scraping failed');
    }
  });
  

app.listen(PORT, () => {
  console.log(`Scraper server running on http://localhost:${PORT}`);
});
