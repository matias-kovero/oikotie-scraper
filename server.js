const express = require('express');
const fetch = require('node-fetch');

const app = express();

const port = process.env.PORT || 3000;

const checkValidSort = (sort) => {
  const valid = ['published_sort_desc', 'published_sort_asc', 'price_desc', 'price_asc', 'size_desc', 'size_asc', 'viewings', 'popularity'];
  if(valid.indexOf(sort) != -1) return true;
  return false;
}

app.get('/', async (req, res) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  try {
    let params = {
      type: isNaN(req.query.type)     ? 100 : req.query.type,
      limit: isNaN(req.query.limit)   ? 24  : req.query.limit,
      offset: isNaN(req.query.offset) ? 0   : req.query.offset,
      sortBy: checkValidSort(req.query.sortBy) ? req.query.sortBy : 'published_sort_desc'
    };
    
    const data = await fetch(`https://asunnot.oikotie.fi/api/cards?buildingType%5B%5D=1&buildingType%5B%5D=256&cardType=${params.type}&limit=${params.limit}&offset=${params.offset}&sortBy=${params.sortBy}`, {
      "headers": {
        "accept": "application/json",
        "accept-language": "fi-FI,fi;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "ota-cuid": "06858c2c5a7734006c8eeac013002b6226d15f76",                           // Keeps auth valid!
        "ota-loaded": "1602486717",                                                       // Keeps auth valid!
        "ota-token": "c1f864ba7aaecfbc971cda3de51892fe2db6f94b5ea2b4bfb506fc51be53f916",  // Keeps auth valid!
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      "referrer": "https://asunnot.oikotie.fi/vuokrattavat-asunnot",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": null,
      "method": "GET",
      "mode": "cors"
    });
    // Currently only responses with 200 are accepted.
    if(data.status != 200) throw new Error(`${data.status} - ${data.statusText}`);

    const oikotie = await data.json();

    res.json(oikotie);
  } catch (err) {
    console.log(err.toString());
    res.json({ error: err.toString() });
  }
})

if(process.env.NODE_ENV.includes("development")) {
  app.listen(port, () =>
    console.log(`Development server running on port: ${port}`)
  );
} else {
  app.listen();
}