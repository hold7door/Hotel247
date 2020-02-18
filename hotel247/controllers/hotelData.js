const mongoose = require('mongoose');
const Hotel = require('../models/hotel');
const Room = require('../models/Room');
const Guest = require('../models/guests');
const BillGuest = require('../models/billGuest');

module.exports = (router) => {
    router.get('/getHotelName/:id', (req, res) => {
        Hotel.findById(req.params.id, (err, data)=>{
            if (err) {
                res.json({hotelName : null});
            }
            else{
                res.json({hotelName : data.hotelName});
            }
        });
    });
    router.post('/updateGuest/:item', (req, res)=>{
        //console.log(req.body);
        var hotelId = mongoose.Types.ObjectId(req.params.item);
        console.log(hotelId);
        Room.findOne({ofHotel : hotelId, roomNumber : req.body.roomNumber}, function(err, data){
            if (err) throw err;
            if (data){
                if (data.available === true){
                    var curDateTime = Date.now();
                    var newGuest = new Guest({
                        guestFirstName : req.body.firstName,
                        guestLastName : req.body.lastName,
                        guestIdType : req.body.idType,
                        guestIdNumber : req.body.idNumber,
                        contactNumber : req.body.contactNumber,
                        city : req.body.city,
                        country : req.body.country,
                        address : req.body.address,
                        guestRoomNumber : data.id,
                        durationOfStay : req.body.durationOfStay,
                        ofHotel : hotelId,
                        checkInDateTime : curDateTime
                    }); 
                    var self = data;
                    newGuest.save(function(err, d){
                        if (err) throw err;
                        else{
                            var newBill = new BillGuest();
                            newBill.billOfGuest = d.id;
                            newBill.currentAmount = 0;
                            var self1 = d;
                            newBill.save((err, e)=>{
                                if(err) throw err;
                                self.available = false;
                                self.bookDateTime = curDateTime;
                                self.bookedUntil = self1.durationOfStay;
                                self.save((error1, t1)=>{
                                    //console.log(self);
                                    self1.billId = e.id;
                                    self1.save((error2, t2)=>{
                                    //console.log(self1); 
                                    });
                                });
                                res.json({success : true});
                            });
                        }
                    });
                }
                else{
                    console.log("Room not available");
                }
            }
            else{
                console.log("Requested room does not exist");
            }
        });
    });
    router.get('/addRoom/:item', (req, res)=>{
        var h = mongoose.Types.ObjectId(req.params.item);
        var newRoom = new Room({
            ofHotel : h,
            roomNumber : '456'
        });
        newRoom.save();
    });
    return router;
};