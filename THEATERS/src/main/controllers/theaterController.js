const ValidationSerevice = require('../services/validationService');


class TheaterController {

    constructor(joiValidator, theaterService) {
        this._joiValidator = joiValidator;
        this._theaterService = theaterService;
    }

    /* CREATE -------------------------------------------------------------------------------------------------------*/

    async createTheater(req, res, next) {
        res.render('create-theater');
    }

    async createTheaterConfirm(req, res, next) {
        /* Input data */
        const theaterData = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
            duration: req.body.duration,
            createdAt: new Date(),
            creator: req.user._id
        }
        /* Validate input */
        const validationResult = this._joiValidator.createTheaterValidation(req);
        const error = ValidationSerevice.generateErrorJoi(validationResult);
        if (error) {
            return res.render('create-theater', {error, theater: theaterData});
        }
        try {
            await this._theaterService.createTheater(theaterData);
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }

    /* FIND -------------------------------------------------------------------------------------------------------*/

    async theaterDetails(req, res, next) {
        /* Input data */
        const theaterId = req.params.id;
        const userId = req.user._id;
        try {
            const theater = await this._theaterService.findTheaterById({theaterId, userId});
            theater.isCreator = Boolean(theater.creator == userId);
            res.render('theater-details', {theater});
        } catch (e) {
            next(e);
        }
    }

    /* EDIT -------------------------------------------------------------------------------------------------------*/

    async editTheater(req, res, next) {
        /* Input data */
        const theaterId = req.params.id;
        const userId = req.user._id;
        try {
            const theater = await this._theaterService.findTheaterById({theaterId, userId});
            res.render('edit-theater', {theater});
        } catch (e) {
            next(e);
        }
    }

    async editTheaterConfirm(req, res, next) {
        /* Input data */
        const theaterData = {
            _id: req.params.id,
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
            duration: req.body.duration
        }
        /* Validate input */
        const validationResult = this._joiValidator.editTheaterValidation(req);
        const error = ValidationSerevice.generateErrorJoi(validationResult);
        if (error) { 
            res.render('edit-theater', {error, theater: theaterData});
            return;
        }
        /* Input data */
        const theaterId = req.params.id;
        const userId = req.user._id;
        try {
            const theater = await this._theaterService.findTheaterById({theaterId, userId});
            if (theater.creator != userId) {
                return res.render('theater-details', {
                    theater,
                    error: "Only the creator can edit the theater"
                });
            }

            await this._theaterService.editTheater({theaterId, theaterData});
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }

    async likeTheater(req, res, next) {
        /* Input data */
        const theaterId = req.params.id;
        const userId = req.user._id;
        try {
            await this._theaterService.likeTheater({theaterId, userId});
            res.redirect(`/theater/details/${theaterId}`)
        } catch (e) {
            next(e);
        }
    }

    /* DELETE -------------------------------------------------------------------------------------------------------*/

    async deleteTheaterConfirm(req, res, next) {
        /* Input data */
        const theaterId = req.params.id;
        const userId = req.user._id;
        try {
            const theater = await this._theaterService.findTheaterById({theaterId});
            if (theater.creator != userId) {
                return res.render('theater-details', {
                    theater,
                    error: "Only the creator can delete the theater"
                });
            }
            await this._theaterService.deleteTheaterConfirm(theaterId);
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = TheaterController;