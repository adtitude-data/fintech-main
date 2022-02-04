var express = require("express");
var router = express.Router();
const VerifyToken = require("../middlewares/verifyToken");
const { StatusCodes } = require("http-status-codes");
const models = require("../models");
const { ErrorHandler } = require("../helpers/errorHandler");

/* Get Agents List */
router.get("/list", VerifyToken , async function (req, res, next) {
  try {
    const users = await models.User.findAll({
      attributes: ['id','fullname', 'email','phone'],
      where: {
        role: 'Agent'
      }
    });
    
    res.status(StatusCodes.OK).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

/* Get Single Agent List */
router.get("/single/:userId", VerifyToken , async function (req, res, next) {
  try {
    const users = await models.User.findAll({
      attributes: ['id','fullname', 'email','phone'],
      where: {
        id: req.params.userId
      }
    });

    res.status(StatusCodes.OK).json({
      data: users[0],
    });
  } catch (error) {
    next(error);
  }
});

/* Get Single Agent List */
router.get("/remove/:userId", VerifyToken , async function (req, res, next) {
  try {
    const users = await models.User.destroy({
      where: {
        id: req.params.userId
      }
    });
    var status = 100;
    if(users) status = 200;
    res.status(StatusCodes.OK).json({
      status: status,
    });
  } catch (error) {
    next(error);
  }
});

/* Get Single Agent List */
router.post("/edit/:userId", VerifyToken , async function (req, res, next) {
  try {
    if (!req.body.fullname) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, "Fullname is required.");
    }
    if (!req.body.email) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, "Email is required.");
    }
    if (!req.body.phone) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, "Phone is required.");
    }


    const emailOldCheck = await models.User.findOne({
      attributes: ['email'],
      where: {
        id: req.params.userId
      }
    });
    console.log('emailOldCheck.email',emailOldCheck.email);
    if(emailOldCheck.email != req.body.email){
      // check if email already exists
      const doesUserExist = await models.User.findOne({
        where: { email: req.body.email },
      });

      if (doesUserExist) {
        throw new ErrorHandler(
          StatusCodes.CONFLICT,
          `A user with email ${req.body.email} already exists`
        );
      }
    }

    const userUpdate = await models.User.update({
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
    },
    { where: { id: req.params.userId } }
    );

    const users = await models.User.findOne({
      attributes: ['id','fullname', 'email','phone'],
      where: {
        id: req.params.userId
      }
    });

    res.status(StatusCodes.CREATED).json({
      data: {
        id: users.id,
        fullname: users.fullname,
        email: users.email,
        phone: users.phone,
        role: users.role
      }
    });
  } catch (err) {
    next(err);
  }
});

/* Add Agents */
router.post("/add", VerifyToken ,  async function (req, res, next) {
  try {
    if (!req.body.fullname) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, "Fullname is required.");
    }
    if (!req.body.email) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, "Email is required.");
    }
    if (!req.body.phone) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, "Phone is required.");
    }
    if (!req.body.password) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, "Password is required.");
    }

    // check if email already exists
    const doesUserExist = await models.User.findOne({
      where: { email: req.body.email },
    });

    if (doesUserExist) {
      throw new ErrorHandler(
        StatusCodes.CONFLICT,
        `A user with email ${req.body.email} already exists`
      );
    }

    const userCreated = await models.User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      role: 'Agent',
    });


    res.status(StatusCodes.CREATED).json({
      data: {
        id: userCreated.id,
        fullname: userCreated.fullname,
        email: userCreated.email,
        phone: userCreated.phone,
        role: userCreated.role
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
