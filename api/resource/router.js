// build your `/api/resources` router here
const router = require("express").Router();
const Resource = require('./model');

router.get("/:resource_id", (req, res, next) => {
  Resource.getResourceById(req.params.resource_id)
    .then((source) => {
      res.status(200).json(source);
    })
    .catch(next);
});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(500).json({
    customMessage: "something went wrong inside the Resource router",
    message: err.message,
  });
});

module.exports = router;