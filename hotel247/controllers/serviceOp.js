const mongoose = require('mongoose');
const ServiceCategory = require('../models/ServiceCategory');
const ServiceSubCategory = require('../models/ServiceSubCategory');
const ServiceItem = require('../models/ServiceItem');

module.exports = (router)=>{
	router.post('/add/category', async (req, res)=>{
		try{
			let hotelId = mongoose.Types.ObjectId(req.body.hotelId);
			let newCatName = req.body.newCatName;
			let newCategory = new ServiceCategory({
				categoryName : newCatName,
				ofHotel : hotelId
			});
			let sd = await newCategory.save();
			res.json({success : true});
		}
		catch (error){
			console.log(error);
			res.json({success : false});
		}
	});
	router.post('/add/subcategory', async (req, res)=>{
		try{
			let hotelId = mongoose.Types.ObjectId(req.body.hotelId);
			let subCatName = req.body.subCatName;
			let catName = req.body.catName;
			let catId = mongoose.Types.ObjectId(req.body.catId);
			let newSubCat = new ServiceSubCategory({
				subCategoryName : subCatName,
				categoryName : catName,
				ofCategory : catId,
				ofHotel : hotelId
			});
			let sd = await newSubCat.save();
			res.json({success : true});
		}
		catch (error){
			console.log(error);
			res.json({success : false});
		}
	});	
	router.post('/add/item', async (req, res)=>{
		try{
			let newItemName = req.body.itemName;
			let itemPrice = req.body.price;
			let catName = req.body.catName;
			let subCatName = req.body.subCatName;
			let hotelId = mongoose.Types.ObjectId(req.body.hotelId);
			let newItem = new ServiceItem({
				itemName : newItemName,
				price : itemPrice,
				categoryName : catName,
				subCategoryName : subCatName,
				ofHotel : hotelId
			});
			let sd = await newItem.save();
			res.json({ success : true });
		}
		catch(error){
			console.log(error);
			res.json({success : false});
		}
	});
	// Returns all Category and Subcategory of hotel
	router.get('/allcat/:id', async (req, res)=>{
		try{
			let hotelId = mongoose.Types.ObjectId(req.params.id);
			let allCategory = await ServiceCategory.find({ ofHotel : hotelId }, 'categoryName -_id');
			let allSubCategory = await ServiceSubCategory.find({ofHotel : hotelId}, 'subCategoryName -_id');
			res.json({success : true, allCategory : allCategory, allSubCategory : allSubCategory});
		}
		catch(error){
			console.log(error);
			res.json({success : false});
		}
	});
	// Return structured and categorised json response of all items
	router.get('/all/:id', async (req, res)=>{
		try{
			let hotelId = mongoose.Types.ObjectId(req.params.id);
			let allItems = await ServiceItem.find({ofHotel:hotelId});
			let jsonResponse = {};
			for (let obj of allItems){
				if (!jsonResponse.hasOwnProperty(obj.categoryName)){
					jsonResponse[obj.categoryName] = [];
				}
				let found = false;
				for (let sb of jsonResponse[obj.categoryName]){
					if (sb.hasOwnProperty(obj.subCategoryName)){
						sb[obj.subCategoryName].push({
							"itemName" : obj.itemName,
							"price" : obj.price
						});
						found = true;
						break;
					}
				}
				if (!found){
					let newSub = {
						[obj.subCategoryName] : []
					};
					newSub[obj.subCategoryName].push({
						"itemName" : obj.itemName,
						"price" : obj.price
					});
					jsonResponse[obj.categoryName].push(newSub);
				}
			}
			res.json({success : true, data : jsonResponse});
		}
		catch(error){
			console.log(error);
			res.json({success : true});
		}
	});
	return router;
};