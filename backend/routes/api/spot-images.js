const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage }= require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;

   // Look for the image
   const image = await SpotImage.findByPk(req.params.imageId);
   if(!image) {
     const err = new Error("Spot Image couldn't be found");
     err.status = 404;
     throw err;
   }
   // Look for review from this image
   const spot = await Spot.findByPk(image.spotId);

   // If review's user id and login user id don't match, throw an error
   if(spot.ownerId !== user.dataValues.id) {
     const err = new Error("Forbidden");
     err.status = 403;
     throw err;
   }

   // Finally delete the image
   await image.destroy();
   res.json({
     message: "Successfully deleted",
     statusCode: 200
   })

})

// Error Handler
router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    statusCode: err.status,
    errors: err.errors
  });
});

module.exports = router;
