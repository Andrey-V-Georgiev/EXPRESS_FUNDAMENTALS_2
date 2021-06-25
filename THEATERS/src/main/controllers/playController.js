const ValidatorHandler = require('../validators/validatorHandler');


class PlayController {

    constructor(joiValidator, playService) {
        this._joiValidator = joiValidator;
        this._playService = playService;
    }

    /* FIND -------------------------------------------------------------------------------------------------------*/

    async playDetails(req, res, next) {
        /* Input data */
        const playId = req.params.id;
        const userId = req.user._id;
        try {
            const play = await this._playService.findPlayById(
                playId,
                userId
            );
            play.isCreator = Boolean(play.creator == userId);
            res.render('theater-details', {play});
        } catch (e) {
            next(e);
        }
    }

    /* CREATE -------------------------------------------------------------------------------------------------------*/

    async createPlay(req, res, next) {
        res.render('create-theater');
    }

    async createPlayConfirm(req, res, next) {
        /* Input data */
        const data = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
            isPublic: Boolean(req.body.isPublic == 'on'),
            createdAt: new Date(),
            creator: req.user._id
        }
        /* Validate input */
        const validationResult = this._joiValidator.createPlayValidation(req);
        const error = ValidatorHandler.generateErrorJoi(validationResult);
        if (error) {
            return res.render('create-theater', {error, play: data});
        }
        try {
            await this._playService.createPlay(
                data
            );
            res.redirect('/');
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
            const play = await this._playService.findPlayById(
                playId,
                userId
            );
            res.render('edit-theater', {play});
        } catch (e) {
            next(e);
        }
    }

    async editPlayConfirm(req, res, next) {
        /* Input data */
        const data = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
            isPublic: Boolean(req.body.isPublic == 'on'),
        } 
        /* Validate input */
        const validationResult = this._joiValidator.editPlayValidation(req);
        const error = ValidatorHandler.generateErrorJoi(validationResult);
        if (error) {
            res.render('edit-theater', {error, play: data});
            return;
        }
        /* Input data */
        const playId = req.params.id;
        const userId = req.user._id;
        try {
            const play = await this._playService.findPlayById(
                playId,
                userId
            );
            if (play.creator != userId) {
                return res.render('theater-details', {
                    play,
                    error: "Only the creator can edit the play"
                });
            }
            await this._playService.editPlay(
                playId,
                data
            );
            res.redirect(`/play/details/${playId}`)
        } catch (e) {
            next(e);
        }
    }

    async likePlay(req, res, next) { 
        /* Input data */
        const playId = req.params.id;
        const userId = req.user._id;
        try {
            await this._playService.likePlay(
                playId,
                userId
            );
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
            const play = await this._playService.findPlayById(playId);
            if (play.creator != userId) {
                return res.render('theater-details', {
                    play,
                    error: "Only the creator can delete the play"
                });
            }
            await this._playService.deletePlayConfirm(
                playId
            );
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = PlayController;