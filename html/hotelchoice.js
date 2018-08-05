var hotelListings = require("../index");

function populateHotelNames(hotelListing){
    var selectTag = document.getElementById("select");
    hotelListing.forEach(function(listing){
    var hotelName = listing["hotel name"];
    var optionTag = document.createElement("option").innerHTML = hotelName;
    selectTag.appendChild(optionTag);
    });
}


console.log(populateHotelNames(hotelListings));