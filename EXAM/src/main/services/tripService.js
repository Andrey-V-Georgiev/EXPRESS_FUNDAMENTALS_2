const Trip = require('../models/Trip');
const User = require('../models/User');


class TripService {

    constructor() { }

    /* FIND --------------------------------------------------------------------------------------------------- */

    async findTripById(tripId, userId) {
        const trip = await Trip.findOne({_id: tripId}).populate('creator').populate('buddies').lean();

        trip.isCreator = trip.creator._id == userId ? true : null;

        const isJoined = trip.buddies.some(b => b._id == userId);
        trip.isJoined = isJoined;

        const buddiesEmails = trip.buddies.map(b => b.email);
        trip.sharedBuddies = buddiesEmails.length > 0 ? buddiesEmails.join(', ') : null;

        trip.driver = trip.creator.email

        const seatsLeftCount = trip.seats - trip.buddies.length ;
        trip.seatsLeft = seatsLeftCount > 0 ? seatsLeftCount : null;

        return trip;
    }

    async findAll(sort) {
        const trips = await Trip.find({}).lean();
        return trips;
    }
 

    /* CREATE ------------------------------------------------------------------------------------------------- */

    async createTrip(tripData) {
        const trip = await Trip.create(tripData);
        return trip;
    }

    /* EDIT ------------------------------------------------------------------------------------------------- */

    async editTrip(tripId, data) {
        return Trip.updateOne({_id: tripId}, data).lean();
    }

    async tripJoin(tripId, userId) { 

        /* Patch the user */
        const user = await User.findById(userId);
        user.tripsHistory.push(tripId);
        await user.save();

        /* Patch the trip */
        const trip = await Trip.findById(tripId);
        trip.buddies.push(userId);
        return trip.save();
    }

 

    /* DELETE ------------------------------------------------------------------------------------------------- */

    async deleteTripConfirm(tripId) {
        const trip = await Trip.deleteOne({_id: tripId});
        return trip;
    }
}

module.exports = TripService;