var WikiScraper = require("wikiscraper.js");
var inElements = require("./elements.json");
var fs = require("fs");

var outElements = [];

var elementNames = [];

inElements.forEach(function(element) {
  elementNames.push(element.name);
});

var scraper = new WikiScraper(elementNames);

scraper.scrape();

scraper.on("siteloaded", function(site, siteNumber) {
  console.log("Scraped site", siteNumber);
});

scraper.on("sitesloaded", function(sites) {
  var jsonSites = JSON.stringify(sites, null, 2);
  console.log("Writing sites to scrapedelements.json");
  fs.writeFileSync("scrapedelements.json", jsonSites);
});

scraper.on("err", function(err) {
  console.log(err);
});