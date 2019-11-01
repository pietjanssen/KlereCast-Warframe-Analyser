# KlereCast-Warframe-Analyser
This project was made to map all the Prime items for the game Warframe by Cost per Relic

**This is an old project that needs updating if you want to use it** 

## Warframe Market API
This project uses the Warframe Market API to get the prices of all Prime items in the game.
https://docs.google.com/document/d/1121cjBNN4BeZdMBGil6Qbuqse-sWpEXPpitQH5fb_Fo/edit?usp=sharing

## How to
In order to use this project, use the function *getItemPriceAvg()* to get the average item price 

```
function getItemPriceAvg(item_id, number, region, online)
  # Gets the average price of an item listed (default avg. 3 cheapest items)
  # item_id: ID of the item (ex. ancient_fusion_core);
  # number : Amount of items the average is calculated on.
  # region : Region of the market to get from eg. 'en'
  # online : Boolean wether or not to only get online players' listed items
```
