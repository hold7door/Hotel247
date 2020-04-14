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
            RoomNumber : null,
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
            email : null,
            suite : null,
            zipCode : null
        };
        Room.findById(roomReq, (err, data)=>{
            if (err) throw err;
            if (data){
                RoomInfo.isAvailable = data.available;
                RoomInfo.RoomNumber = data.roomNumber;
                RoomInfo.BookingDateTime = data.bookDateTime;
                RoomInfo.DurationOfStay = data.bookedUntil;
                RoomInfo.suite = data.suiteType;
                if (data.available === false){
                    Guests.findOne({guestRoomNumber : roomReq},(err, gdata)=>{
                        if (err) throw err;
                        RoomInfo.GuestId = gdata._id;
                        RoomInfo.FirstName = gdata.guestFirstName;
                        RoomInfo.LastName = gdata.guestLastName;
                        RoomInfo.IdType = gdata.guestIdType;
                        RoomInfo.IdNumber = gdata.guestIdNumber;
                        RoomInfo.contact = gdata.contactNumber;
                        RoomInfo.city = gdata.city;
                        RoomInfo.country = gdata.country;
                        RoomInfo.Address = gdata.address;
                        RoomInfo.BillId = gdata.billId;
                        RoomInfo.email = gdata.email;
                        RoomInfo.zipCode = gdata.zipCode;
                        res.json({isroom : true, roomdetails : RoomInfo});
                    });
                }
            }
            else{
                console.log("No such room exists");
                res.json({isroom : false});
            }
        });
    });
    router.post('/editInfo/:guestId', (req, res)=>{
        var gid = mongoose.Types.ObjectId(req.params.guestId);
        Guests.findById(gid, (err, data)=>{
            if (err) throw err;
            for (let dataItem of req.body.updatedData){
                var fkey = dataItem[0];
                var fval = dataItem[1];
                if (fkey === "email")
                    data.email = fval;
                else if (fkey === "contact")
                    data.contactNumber = fval;
                //Duration of Room remains unchange (fix)
                else if (fkey === "duration")
                    data.durationOfStay = fval;
                else if (fkey === "idtype")
                    data.guestIdType = fval;
                else if (fkey === "idNumber")
                    data.guestIdNumber = fval;
                else if (fkey === "address")
                    data.address = fval;
                else if (fkey === "city")
                    data.city = fval;
                else if (fkey === "country")
                    data.country = fval;
                else if (fkey === "zipCode")
                    data.zipCode = fval;
            }
            data.save((er)=>{
                if (er) throw er;
                res.json({success : true});
            });
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