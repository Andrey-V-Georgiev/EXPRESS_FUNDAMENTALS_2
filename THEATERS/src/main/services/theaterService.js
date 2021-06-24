const Play = require('../models/Play');
const User = require('../models/User');


class TheaterService {

    constructor() { }

    /* CREATE ------------------------------------------------------------------------------------------------- */

    async createPlay(playData) {
        const play = await Play.create(playData);
        return play;
    }

    /* FIND --------------------------------------------------------------------------------------------------- */

    async findPlayById({playId, userId}) {
        const play = await Play.findOne({_id: playId}).lean();
        const isLiked = play.usersLiked.some(id => id == userId);
        play.isLiked = isLiked;
        return play;
    }

    async findAll(search) {
        let plays;
        if (search) {
            plays = await Play.find({title: {$regex: search, $options: 'i'}}).sort({createdAt: 'desc'}).lean();
        } else {
            plays = await Play.find({}).sort({createdAt: 'desc'}).lean();
        }
        const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        const locals = "en-US";

        return plays.map(c => {
            c.createdAt = c.createdAt.toLocaleDateString(locals, options);
            return c;
        });
    }

    async findTopLiked(limit) {
        const plays = await Play.find({})
            .sort({usersLiked: 'desc'})
            .limit(limit)
            .lean();

        const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        const locals = "en-US";

        return plays.map(c => {
            c.createdAt = c.createdAt.toLocaleDateString(locals, options);
            c.enroled = c.usersLiked.length;
            return c;
        });
    }

    /* EDIT ------------------------------------------------------------------------------------------------- */

    async editPlay({playId, playData}) {
        return Play.updateOne({_id: playId}, playData).lean();
    }

    async likeTheater({playId, userId}) {

        /* Patch the user */
        const user = await User.findById(userId);
        user.likedPlays.push(playId);
        await user.save();

        /* Patch the play */
        const play = await Play.findById(playId);
        play.usersLiked.push(userId);
        return play.save();
    }

    /* DELETE ------------------------------------------------------------------------------------------------- */

    async deletePlayConfirm(playId) {
        const play = await Play.deleteOne({_id: playId});
        return play;
    }
}

module.exports = TheaterService;