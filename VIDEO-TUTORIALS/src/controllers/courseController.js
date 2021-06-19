const {generateErrorString} = require('../utils/validation-util');


class CourseController {

    constructor(joiValidator, courseService) {
        this._joiValidator = joiValidator;
        this._courseService = courseService;
    }

    /* CREATE */

    async createCourse(req, res, next) {
        res.render('course/create-course');
    }

    async createCourseConfirm(req, res, next) {
        /* Validate input */
        const validationResult = this._joiValidator.createCourseValidation(req);
        const error = generateErrorString(validationResult);
        if (error) {
            return res.render('course/create-course', {error});
        }
        const courseData = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isPublic: Boolean(req.body.isPublic),
            createdAt: new Date()
        }
        try {
            await this._courseService.createCourse(courseData);
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }

    /* EDIT */

    async editCourse(req, res, next) {
        res.render('course/edit-course');
    }

    async editCourseConfirm(req, res, next) {
        res.redirect('/');
    }

    async enrollUser(req, res, next) {
        /* Validate input */
        const validationResult = this._joiValidator.paramsIdValidation(req);
        const error = generateErrorString(validationResult);
        if (error) {
            return res.render('home/user-home', {error});
        }
        /* Input data */
        const courseId = req.params.id;
        const userId = req.user._id; 
        try {
            await this._courseService.enrollUser(courseId, userId);
            res.redirect(`/course/details/${courseId}`)
        } catch (e) {
            next(e);
        }
    }

    /* DETAILS */

    async courseDetails(req, res, next) {
        /* Validate input */
        const validationResult = this._joiValidator.paramsIdValidation(req);
        const error = generateErrorString(validationResult);
        if (error) {
            return res.render('home/user-home', {error});
        }
        /* Input data */
        const courseId = req.params.id;
        const userId = req.user._id;
        try {
            const course = await this._courseService.findCourseById(courseId, userId);
            res.render('course/course-details', {course});
        } catch (e) {
            next(e);
        }
    }

}

module.exports = CourseController;