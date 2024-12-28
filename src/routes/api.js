const express = require('express');
const productController= require('../controller/ProductController')
const UserController=require('../controller/UserController')
const WishListController=require('../controller/WishListController')
const CartListController=require('../controller/CartListController');
const InvoiceController=require('../controller/InvoiceController')
const featuresController=require('../controller/FeatureController')
const AuthVerification =require('../middlewares/AuthVerification')

const router = express.Router();


// product
router.get('/productBrandList',productController.productBrandList)
router.get('/productcategoriList',productController.productcategoriList)
router.get('/productsliderList',productController.productsliderList)
router.get('/productAll',productController.productAll)
router.get('/productlistByBrand/:BrandID',productController.productlistByBrand)
router.get('/productlistBycategori/:categoryID',productController.productlistBycategori)
router.get('/productBySimiler/:categoryID',productController.productBySimiler)
router.get('/productlistBykeyword/:keyword',productController.productlistBykeyword)
router.get('/productremark/:remark',productController.productremark)
router.get('/producDetails/:ProductID',productController.producDetails)
router.get('/productReviewList/:ProductID',productController.productReviewList)


router.post('/ProductListByFilter',productController.ProductListByFilter)


// user
router.get('/UserOTP/:email',UserController.UserOTP);
router.get('/VerifyLogin/:email/:otp',UserController.VerifyLogin);
router.get('/UserLogout',AuthVerification,UserController.UserLogout);
router.post('/ProfileCreate',AuthVerification,UserController.ProfileCreate);
router.post('/ProfileUpdate',AuthVerification,UserController.ProfileUpdate);
router.get('/ReadProfile',AuthVerification,UserController.ReadProfile);

// wishList
router.post('/createWish',AuthVerification,WishListController.addWish);
router.post('/RemovedWish',AuthVerification,WishListController.RemovedWish);
router.get('/wishList',AuthVerification,WishListController.WishList);

// cart
router.post('/addToCartList',AuthVerification,CartListController.addCartList)
router.post('/removedCartList',AuthVerification,CartListController.removedCartList)
router.get('/cartList',AuthVerification,CartListController.CartList)
router.post('/updateCart/:cartID',AuthVerification,CartListController.updateCartList)


//Invoice & payment
router.get('/CreateInvoice',AuthVerification,InvoiceController.CreateInvoices);

// fast we work payment and then invoiceList
router.get('/InvoiceList',AuthVerification,InvoiceController.InvoiceList);
router.get('/InvoiceProductList/:invoice_id',AuthVerification,InvoiceController.InvoiceProductList);

// Payment
router.post('/PaymentSuccess/:trxID',InvoiceController.PaymentSuccess)
router.post('/PaymentCancel/:trxID',InvoiceController.PaymentCancel)
router.post('/PaymentFail/:trxID',InvoiceController.PaymentFail)
router.post('/PaymentIPN/:trxID',InvoiceController.PaymentIPN)



// Features list
router.get('/featureslist',featuresController.FeaturesList);
router.get('/legalsDetails/:type',featuresController.LegalDetails);
// create review
router.post('/CreateReview',AuthVerification,productController.CreateReview);
























module.exports=router