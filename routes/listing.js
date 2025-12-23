const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// All listings
router.get("/", wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
}));

// New form
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new");
});

// Create listing
router.post(
    "/",
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(async (req, res) => {
        const listing = new Listing(req.body.listing);
        listing.owner = req.user._id;
        listing.geometry = {
            type: "Point",
            coordinates: [req.body.listing.lng, req.body.listing.lat]
        };
        await listing.save();
        req.flash("success", "Successfully created a new listing!");
        res.redirect(`/listings/${listing._id}`);
    })
);

// Show listing
router.get("/:id", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id)
        .populate("owner")
        .populate({ path: "reviews", populate: { path: "author" } });
    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect("/listings");
    }
    res.render("listings/show", { listing });
}));

// Edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit", { listing });
}));

// Update listing
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    listing.geometry = {
        type: "Point",
        coordinates: [req.body.listing.lng, req.body.listing.lat]
    };
    await listing.save();
    req.flash("success", "Successfully updated listing!");
    res.redirect(`/listings/${listing._id}`);
}));

// Delete listing
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}));

module.exports = router;