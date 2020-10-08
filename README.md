# Oikotie scraper (housing)

Get basic listing information from [oikotie](https://asunnot.oikotie.fi)  

Response format:  
```js
{
  found: Number,
  start: Number,
  cards: Array[Listings]
}
```

### Usage
Endpoint: `https://oikotie.vercel.app/`  
### Valid query parameters:
##### type
*Default: 100*  
```
100 = For Sale
101 = For Rent
```
Ex. Search housing for sale: `https://oikotie.vercel.app/?type=100`
##### limit
*Default: 24*  
You should try to keep below default or at default, as going above may cause timeouts.

Ex. Search only 10 listings: `https://oikotie.vercel.app/?limit=10`
##### offset
*Default: 0*  
How far from start you want to offset the search

Ex. Search listings 25-35: `https://oikotie.vercel.app/?limit=10&offset=24`
##### sortBy
*Default: published_sort_desc*  
```
published_sort_desc  
published_sort_asc  
price_desc  
price_asc  
size_desc  
size_asc  
viewings  
popularity  
```

Ex. Search listings cheapest first: `https://oikotie.vercel.app/?sortBy=price_asc`

#### TODO
```
search by house type  
search by area code / location
```
