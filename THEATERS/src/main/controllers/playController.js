const ValidationSerevice = require('../services/validationService');


class PlayController {

    constructor(joiValidator, playService) {
        this._joiValidator = joiValidator;
        this._playService = playService;
    }

    /* CREATE -------------------------------------------------------------------------------------------------------*/

    async createPlay(req, res, next) {
        res.render('create-theater');
    }

    async createPlayConfirm(req, res, next) {
        /* Input data */
        const playData = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
            duration: req.body.duration,
            createdAt: new Date(),
            creator: req.user._id
        }
        /* Validate input */
        const validationResult = this._joiValidator.createPlayValidation(req);
        const error = ValidationSerevice.generateErrorJoi(validationResult);
        if (error) {
            return res.render('create-theater', {error, play: playData});
        }
        try {
            await this._playService.createPlay(playData);
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }

    /* FIND -------------------------------------------------------------------------------------------------------*/

    async playDetails(req, res, next) {
        /* Input data */
        const playId = req.params.id;
        const userId = req.user._id;
        try {
            const play = await this._playService.findPlayById({playId, userId});
            play.isCreator = Boolean(play.creator == userId);
            res.render('theater-details', {play});
        } catch (e) {
            next(e);
        }
    }

    /* EDIT -------------------------------------------------------------------------------------------------------*/

    async editPlay(req, res, next) {
        /* Input data */
        const playId = req.params.id;
        const userId = req.user._id;
        try {
            const play = await this._playService.findPlayById({playId, userId});
            res.render('edit-theater', {play});
        } catch (e) {
            next(e);
        }
    }

    async editPlayConfirm(req, res, next) {
        /* Input data */
        const playData = {
            _id: req.params.id,
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
            duration: req.body.duration
        }
        /* Validate input */
        const validationResult = this._joiValidator.editPlayValidation(req);
        const error = ValidationSerevice.generateErrorJoi(validationResult);
        if (error) { 
            res.render('edit-theater', {error, play: playData});
            return;
        }
        /* Input data */
        const playId = req.params.id;
        const userId = req.user._id;
        try {
            const play = await this._playService.findPlayById({playId, userId});
            if (play.creator != userId) {
                return res.render('theater-details', {
                    play,
                    error: "Only the creator can edit the play"
                });
            }

            await this._playService.editPlay({playId, playData});
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }

    async likePlay(req, res, next) {
        /* Input data */
        const playId = req.params.id;
        const userId = req.user._id;
        try {
            await this._playService.likePlay({playId, userId});
            res.redirect(`/play/details/${playId}`)
        } catch (e) {
            next(e);
        }
    }

    /* DELETE -------------------------------------------------------------------------------------------------------*/

    async deletePlayConfirm(req, res, next) {
        /* Input data */
        const playId = req.params.id;
        const userId = req.user._id;
        try {
            const play = await this._playService.findPlayById({playId});
            if (play.creator != userId) {
                return res.render('theater-details', {
                    play,
                    error: "Only the creator can delete the play"
                });
            }
            await this._playService.deletePlayConfirm(playId);
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = PlayController;