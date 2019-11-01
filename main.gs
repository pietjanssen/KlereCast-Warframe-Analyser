/*
* Imports Warframe prices to your spreadsheet using the Warframe Market API
* Made by pietjanssen
* link: https://docs.google.com/document/d/1121cjBNN4BeZdMBGil6Qbuqse-sWpEXPpitQH5fb_Fo/mobilebasic#heading=h.irwashnbboeo
*/

var NUMBER_TO_PARSE = 3;
var item_mean = 0;

/**
* Gets the average price of an item listed (default avg. 3 cheapest items)
* @param item_id ID of the item (ex. ancient_fusion_core);
* @param number Amount of items the average is calculated on.
* @customFunction
*/
function getItemPriceAvg(item_id, number, region, online) {
  if (number) {
    NUMBER_TO_PARSE = number;
  }
  var item_id = formatItemName(item_id);
  calcPrices(item_id, region, online);
  return item_mean;
}

function calcPrices(item_id, region, online) {
  try{
    var res = UrlFetchApp.fetch("https://api.warframe.market/v1/items/"+ item_id  +"/orders");
    var content = res.getContentText();
    var data = JSON.parse(content);
    var results;
    
    data = data.payload.orders.filter(function (a) { return a.order_type == "sell" && a.platform == "pc" });
    if (region) {
      data = data.filter(function (a) { return a.region == region });
    }
    if (online) {
      data = data.filter(function (a) { return a.user.status == "ingame" || a.user.status == "online" });
    }
    
    results = data.map(function (res) { return res.platinum });
    results.sort(cmp);
    if (results.length < NUMBER_TO_PARSE) {
      NUMBER_TO_PARSE = results.length;
    }
    Logger.log(results);
    
    results = results.splice(0, NUMBER_TO_PARSE);
    if (results.length > 0) {
      item_mean = Math.round(mean(results));
    } else {
      item_mean = 0;
    }
    Logger.log(item_mean);
  }
  catch(err){
    return 0;
  }
}

function testAvgPrices(){
  getItemPriceAvg("lith a1 intact", 3, "en", true);
}

function cmp(a, b) {
  return a - b;
}

function mean(numbers) {
  var total = 0, i;
  for (i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total / numbers.length;
}

function formatItemName(item) {
  if(item != undefined)
    return item.toLowerCase().split(' ').join('_');
  else
    return item;
}
