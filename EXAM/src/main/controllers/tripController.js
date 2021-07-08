const ValidatorHandler = require('../validators/validatorHandler');


class TripController {

    constructor(joiValidator, tripService) {
        this._joiValidator = joiValidator;
        this._tripService = tripService;
    }

    /* FIND -------------------------------------------------------------------------------------------------------*/

    async tripsAll(req, res, next) { 
        try {
            const trips = await this._tripService.findAll(); 
            res.render('shared-trips', {trips});
        } catch (e) {
            next(e);
        }
    }

    async tripDetails(req, res, next) {
        /* Input data */
        const tripId = req.params.id;
        const userId = req.user._id;
        try {
            const trip = await this._tripService.findTripById(
                tripId,
                userId
            );
            res.render('trip-details', {trip});
        } catch (e) {
            next(e);
        }
    }

    /* CREATE -------------------------------------------------------------------------------------------------------*/

    async createTrip(req, res, next) {
        res.render('trip-create');
    }

    async createTripConfirm(req, res, next) {
        /* Input data */
        const data = {
            startPoint: req.body.startPoint.trim(),
            endPoint: req.body.endPoint.trim(),
            date: req.body.date.trim(),
            time: req.body.time.trim(),
            carImage: req.body.carImage.trim(),
            carBrand: req.body.carBrand.trim(),
            seats: req.body.seats.trim(),
            price: req.body.price.trim(),
            description: req.body.description.trim(),
            creator: req.user._id
        }
        /* Validate input */
        const validationResult = this._joiValidator.createTripValidation(req);
        const error = ValidatorHandler.generateErrorJoi(validationResult);
        if (error) {
            return res.render('trip-create', {error, trip: data});
        }
        try {
            await this._tripService.createTrip(
                data
            );
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }

    /* EDIT -------------------------------------------------------------------------------------------------------*/

    async editTrip(req, res, next) {
        /* Input data */
        const tripId = req.params.id;
        const userId = req.user._id;
        try {
            const trip = await this._tripService.findTripById(
                tripId,
                userId
            );
            res.render('trip-edit', {trip});
        } catch (e) {
            next(e);
        }
    }

    async editTripConfirm(req, res, next) {
        /* Input data */
        const data = {
            startPoint: req.body.startPoint.trim(),
            endPoint: req.body.endPoint.trim(),
            date: req.body.date.trim(),
            time: req.body.time.trim(),
            carImage: req.body.carImage.trim(),
            carBrand: req.body.carBrand.trim(),
            seats: req.body.seats.trim(),
            price: req.body.price.trim(),
            description: req.body.description.trim(),
            creator: req.user._id
        }
        /* Validate input */
        const validationResult = this._joiValidator.editTripValidation(req);
        const error = ValidatorHandler.generateErrorJoi(validationResult);
        if (error) {
            res.render('trip-edit', {error, trip: data});
            return;
        } 
        const tripId = req.params.id;
        const userId = req.user._id;
        try {
            const trip = await this._tripService.findTripById(
                tripId,
                userId
            );
            if (!trip.isCreator) {
                return res.render('trip-details', {
                    trip,
                    error: "Only the creator can edit the Trip"
                });
            }
            await this._tripService.editTrip(
                tripId,
                data
            );
            res.redirect(`/trip/details/${tripId}`)
        } catch (e) {
            next(e);
        }
    }

    async tripJoin(req, res, next) { 
        /* Input data */
        const tripId = req.params.id;
        const userId = req.user._id;
        try {
            await this._tripService.tripJoin(
                tripId,
                userId
            );
            res.redirect(`/trip/details/${tripId}`)
        } catch (e) {
            next(e);
        }
    }

    /* DELETE -------------------------------------------------------------------------------------------------------*/

    async deleteTripConfirm(req, res, next) {
        /* Input data */
        const tripId = req.params.id; 
        try { 
            await this._tripService.deleteTripConfirm(
                tripId
            );
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = TripController;