const ValidationSerevice = require('../services/validationService');


class CourseController {

    constructor(joiValidator, courseService) {
        this._joiValidator = joiValidator;
        this._courseService = courseService;
    }

    /* CREATE -------------------------------------------------------------------------------------------------------*/

    async createCourse(req, res, next) {
        res.render('courses/create-course');
    }

    async createCourseConfirm(req, res, next) {
        /* Validate input */
        const validationResult = this._joiValidator.createCourseValidation(req);
        const error = ValidationSerevice.generateErrorJoi(validationResult);
        if (error) {
            return res.render('courses/create-course', {error});
        }
        const courseData = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
            isPublic: Boolean(req.body.isPublic),
            createdAt: new Date(),
            creator: req.user._id
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
            const course = await this._courseService.findCourseById(courseId, userId);
            course.isCreator = Boolean(course.creator == userId);
            res.render('courses/course-details', {course});
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
            const course = await this._courseService.findCourseById(courseId, userId);
            course.checked = course.isPublic ? 'checked' : '';
            res.render('courses/edit-course', {course});
        } catch (e) {
            next(e);
        }
    }

    async editCourseConfirm(req, res, next) {
        /* Validate input */
        const validationResult = this._joiValidator.editCourseValidation(req);
        const error = ValidationSerevice.generateErrorJoi(validationResult);
        if (error) {
            const courses = await this._courseService.findAll();
            res.render('home/user-home', {error, user, courses});
            return;
        }
        /* Input data */
        const courseId = req.params.id;
        const userId = req.user._id;
        try {
            const course = await this._courseService.findCourseById(courseId, userId);
            if (course.creator != userId) {
                return res.render('courses/course-details', {
                    course,
                    error: "Only the creator can edit the course"
                });
            }
            const courseData = {
                _id: courseId,
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                imageUrl: req.body.imageUrl.trim(),
                isPublic: Boolean(req.body.isPublic)
            }  
            await this._courseService.editCourse(courseId, courseData);
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
            await this._courseService.enrollUser(courseId, userId);
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
            const course = await this._courseService.findCourseById(courseId);
            if (course.creator != userId) {
                return res.render('courses/course-details', {
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