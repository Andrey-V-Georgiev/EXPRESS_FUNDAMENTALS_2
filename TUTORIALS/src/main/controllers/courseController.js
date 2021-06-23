const ValidationSerevice = require('../services/validationService');


class CourseController {

    constructor(joiValidator, courseService) {
        this._joiValidator = joiValidator;
        this._courseService = courseService;
    }

    /* CREATE -------------------------------------------------------------------------------------------------------*/

    async createCourse(req, res, next) {
        res.render('pages/courses/create-course');
    }

    async createCourseConfirm(req, res, next) {
        /* Input data */
        const courseData = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
            duration: req.body.duration,
            createdAt: new Date(),
            creator: req.user._id
        }
        /* Validate input */
        const validationResult = this._joiValidator.createCourseValidation(req);
        const error = ValidationSerevice.generateErrorJoi(validationResult);
        if (error) {
            return res.render('pages/courses/create-course', {error, course: courseData});
        }
        try {
            await this._courseService.createCourse(courseData);
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }

    /* FIND -------------------------------------------------------------------------------------------------------*/

    async courseDetails(req, res, next) {
        /* Input data */
        const courseId = req.params.id;
        const userId = req.user._id;
        try {
            const course = await this._courseService.findCourseById({courseId, userId});
            course.isCreator = Boolean(course.creator == userId);
            res.render('pages/courses/course-details', {course});
        } catch (e) {
            next(e);
        }
    }

    /* EDIT -------------------------------------------------------------------------------------------------------*/

    async editCourse(req, res, next) {
        /* Input data */
        const courseId = req.params.id;
        const userId = req.user._id;
        try {
            const course = await this._courseService.findCourseById({courseId, userId});
            res.render('pages/courses/edit-course', {course});
        } catch (e) {
            next(e);
        }
    }

    async editCourseConfirm(req, res, next) {
        /* Input data */
        const courseData = {
            _id: req.params.id,
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
            duration: req.body.duration
        }
        /* Validate input */
        const validationResult = this._joiValidator.editCourseValidation(req);
        const error = ValidationSerevice.generateErrorJoi(validationResult);
        if (error) { 
            res.render('pages/courses/edit-course', {error, course: courseData});
            return;
        }
        /* Input data */
        const courseId = req.params.id;
        const userId = req.user._id;
        try {
            const course = await this._courseService.findCourseById({courseId, userId});
            if (course.creator != userId) {
                return res.render('pages/courses/course-details', {
                    course,
                    error: "Only the creator can edit the course"
                });
            }

            await this._courseService.editCourse({courseId, courseData});
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }

    async enrollUser(req, res, next) {
        /* Input data */
        const courseId = req.params.id;
        const userId = req.user._id;
        try {
            await this._courseService.enrollUser({courseId, userId});
            res.redirect(`/course/details/${courseId}`)
        } catch (e) {
            next(e);
        }
    }

    /* DELETE -------------------------------------------------------------------------------------------------------*/

    async deleteCourseConfirm(req, res, next) {
        /* Input data */
        const courseId = req.params.id;
        const userId = req.user._id;
        try {
            const course = await this._courseService.findCourseById({courseId});
            if (course.creator != userId) {
                return res.render('pages/courses/course-details', {
                    course,
                    error: "Only the creator can delete the course"
                });
            }
            await this._courseService.deleteCourseConfirm(courseId);
            res.redirect('/');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = CourseController;