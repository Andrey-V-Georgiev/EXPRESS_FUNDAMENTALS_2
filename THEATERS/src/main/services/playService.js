const Play = require('../models/Play');
const User = require('../models/User');


class PlayService {

    constructor() { }

    /* FIND --------------------------------------------------------------------------------------------------- */

    async findPlayById(playId, userId) {
        const play = await Play.findOne({_id: playId}).lean();
        const isLiked = play.usersLiked.some(id => id == userId);
        play.isLiked = isLiked;
        play.checked = play.isPublic ? 'checked' : '';
        return play;
    }

    async findAll(sort) {
        let plays;
        if (sort == 'likes') {
            plays = await Play.find({}).sort({usersLiked: 'desc'}).lean();
        } else {
            plays = await Play.find({}).sort({createdAt: 'desc'}).lean();
        }
        const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        const locals = "en-US";

        return plays.map(c => {
            c.likes = c.usersLiked.length;
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

    /* CREATE ------------------------------------------------------------------------------------------------- */

    async createPlay(playData) {
        const play = await Play.create(playData);
        return play;
    }

    /* EDIT ------------------------------------------------------------------------------------------------- */

    async editPlay(playId, data) {
        return Play.updateOne({_id: playId}, data).lean();
    }

    async likePlay(playId, userId) {

        console.log(playId, userId)

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

module.exports = PlayService;