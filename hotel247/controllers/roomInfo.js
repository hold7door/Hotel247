const mongoose = require('mongoose');
const Room = require('../models/Room');
const Guests = require('../models/guests');
const Hotel = require('../models/hotel');

module.exports = (router)=>{
    router.get('/allRooms/:hotel', (req, res)=>{
        var hotelId = mongoose.Types.ObjectId(req.params.hotel);
        Room.find({ofHotel : hotelId}, (err, data)=>{
            if (err) throw err;
            if (data){
                res.json({found : true, allRoom : data});
            }   
            else{
                console.log("Hotel DNE or rooms not added to hotel");
                res.json({found : false});
            } 
        });
    });

    router.get('/getRoomInfo/:room', (req, res)=>{
        var roomReq = mongoose.Types.ObjectId(req.params.room);
        const RoomInfo = {
            isAvailable : null,
            RoomNmber : null,
            BookingDateTime : null,
            DurationOfStay : null,
            GuestId : null,
            FirstName : null,
            LastName : null,
            IdType : null,
            IdNumber : null,
            contact : null,
            city : null,
            country : null,
            Address : null,
            BillId : null,
        };
        Room.findById(roomReq, (err, data)=>{
            if (err) throw err;
            if (data){
                RoomInfo.isAvailable = data.available;
                RoomInfo.RoomNmber = data.roomNumber;
                RoomInfo.BookingDateTime = data.bookDateTime;
                RoomInfo.DurationOfStay = data.bookedUntil;
                if (data.available === false){
                    Guests.findOne({guestRoomNumber : roomReq},(err, gdata)=>{
                        if (err) throw err;
                        RoomInfo.GuestId = gdata.guestId;
                        RoomInfo.FirstName = gdata.guestFirstName;
                        RoomInfo.LastName = gdata.guestLastName;
                        RoomInfo.IdType = gdata.guestIdType;
                        RoomInfo.IdNumber = gdata.guestIdNumber;
                        RoomInfo.contact = gdata.contactNumber;
                        RoomInfo.city = gdata.city;
                        RoomInfo.country = gdata.country;
                        RoomInfo.Address = gdata.address;
                        RoomInfo.BillId = gdata.billId;
                    });
                }
                res.json({isroom : true, roomdetails : RoomInfo});
            }
            else{
                console.log("No such room exists");
                res.json({isroom : false});
            }
        });
    });

    router.get('/bookedRooms/:hotel', (req, res)=>{
        //For Dashboard Table
        var hotelId = mongoose.Types.ObjectId(req.params.hotel);

        Guests.find({ofHotel : hotelId}).populate('guestRoomNumber').exec(function(err, data){
            //console.log(data);
            res.json({bookedrooms : data});
        });
    });

    return router;
}