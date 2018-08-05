var http = require('http');
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');
var dataset = [];
var hotelListing = [{
    'hotel name': 'Havana Hotels and Suits',
    'hotel address': '12 Havana Avenue, Ikoyi',
    'number of rooms': '150',
    'number of floor': '3',
    'room type single': 'Available',
    'price of single': '1000',
    'room type double': 'Available',
    'price of double': '1500',
    'room type tripple': 'Available',
    'price of tripple': '3000',
    'room type quad': 'Available',
    'price of quad': '5500',
    'room type queen': 'Available',
    'price of queen': '8000',
    'room type king': 'Available',
    'price of king': '15000',
    gym: 'Available',
    resturant: 'Available',
    electricity: 'Available',
    'swimming pool': 'Available',
    laundry: 'Available',
    'conference facility': 'Available',
    _uniqueID: 1
}];
http.createServer(function (req, res) {
    console.log(req.method)
    var urlString = url.parse(req.url,true)
    if(urlString.pathname == "/reservation") {
        fs.readFile('./html/reservation.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            if(urlString.query.year) res.write(urlString.query.year)
            res.end();
        });
    } else if(urlString.pathname == "/"){
        fs.readFile('./html/homepage.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }else if(urlString.pathname == "/addhotel"){
        fs.readFile('./html/addhotel.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }else if(urlString.pathname == "/submit"){
        if(req.method != "POST") {
            displaySubmit(res)
        // var success = fs.readFileSync("./html/partials/reservationsuccess.html");
        // res.write(success);
        // res.end();
        }
        else {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                //Assign room number to Users during reservation
                //assignRoomNumber(fields, hotelListing, hotelChoice);
                dataset.push(fields)
                console.log(dataset)
                res.writeHead(302, {'Location': './html/partials/reservationsuccess.html'});
                res.end();
                // displaySubmit(res)
            });
        }
    } else if(urlString.pathname == "/html/partials/reservationsuccess.html"){
            fs.readFile("./html/partials/reservationsuccess.html", function(err, data){
                res.write(data);
                res.end();
            });
    }else if(urlString.pathname =="/html/partials/viewhotel"){
        if(req.method != "POST"){
            viewhotel(res)
        }else{
            var hotelForm = new formidable.IncomingForm();
            hotelForm.parse(req, function (err, fields, files) {
                //delete all empty fields
                for(var item in fields){
                    if(fields[item] == ""){
                    delete fields[item];
                    }
                }
                //Give unique Identifier
                uniqueIdHotel(fields);
                console.log(fields)

                hotelListing.push(fields)
                console.log(hotelListing)
                res.writeHead(302, {'Location': './reservationsuccess.html'});
                res.end();
                // displaySubmit(res)
            });
        }
    }else {
        res.end("Page not found")
    }
}).listen(8080);
console.log("The action is happening on port 8080");

function displaySubmit(res){
    var header = fs.readFileSync('./html/partials/header.html')
    var footer = fs.readFileSync('./html/partials/footer.html')
    res.write(header);
    res.write("<table>");
    dataset.forEach(function(fields) {
    res.write("<tr>");
        Object.keys(fields).forEach(function(key) {
            res.write(`
            <td>${key} : ${fields[key]}</td>
            `)
        })
    res.write("</tr>");
    })
    res.write("</table>");
    res.write(footer);
    res.end();
}

function viewhotel(res){
    var hotelViewHeader = fs.readFileSync("./html/partials/viewhotel.html");
    var hotelViewFooter = fs.readFileSync("./html/partials/viewhotelfooter.html");
    res.write(hotelViewHeader);
    hotelListing.forEach(function(items){
        res.write("<ul>");
        Object.keys(items).forEach(function(key){
            res.write(`<li class="">${key} : ${items[key]}</li>`);
        });
        res.write("</ul>");
    });
    res.write(hotelViewFooter);
    res.end();
}

function uniqueIdHotel(fields){
    return fields._uniqueID = hotelListing.length+1;
}
var bookedHotelRooms = [];
function assignRoomNumber(fields, hotelListing, hotelChoice){
    //Get the name of the hotel from select tag which will be created dynamically
    for(var i = 0; i < hotelListing.length; i++){
        if(hotelListing[i]['hotel name'] === hotelChoice){
            var newHotelRoom =  Math.floor(Math.randon()* Number(hotelListing[i].numberOfRoom));
            if(!!bookedHotelRooms.length){
                bookedHotelRooms.push(newHotelRoom)
            }else{
                bookedHotelRooms.forEach(function(item){
                if(bookedHotelRooms != newHotelRoom){
                    bookedHotelRooms.push(newHotelRoom)
                }
            });
        }
    }

    }
    fields._roomNumber = newHotelRoom
    return newHotelRoom;

}

function populateHotelNames(hotelListing){
    var selectTag = document.getElementById("select");
    hotelListing.forEach(function(listing){
    var hotelName = listing["hotel name"];
    var optionTag = document.createElement("option").innerHTML = hotelName;
    selectTag.appendChild(optionTag);
    });
}

var sampleData = {
    'hotel name': 'Havana Hotels and Suits',
    'hotel address': '12 Havana Avenue, Ikoyi',
    'number of rooms': '150',
    'number of floor': '3',
    'room type single': 'Available',
    'price of single': '1000',
    'room type double': 'Available',
    'price of double': '1500',
    'room type tripple': 'Available',
    'price of tripple': '3000',
    'room type quad': 'Available',
    'price of quad': '5500',
    'room type queen': 'Available',
    'price of queen': '8000',
    'room type king': 'Available',
    'price of king': '15000',
    gym: 'Available',
    resturant: 'Available',
    electricity: 'Available',
    'swimming pool': 'Available',
    laundry: 'Available',
    'conference facility': 'Available',
    _uniqueID: 1
}

module.exports = hotelListing;