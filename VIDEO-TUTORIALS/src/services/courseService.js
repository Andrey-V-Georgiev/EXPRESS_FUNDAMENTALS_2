const Course = require('../models/Course');
const User = require('../models/User');


class CourseService {

    constructor() { }

    /* CREATE ------------------------------------------------------------------------------------------------- */

    async createCourse(courseData) {
        const course = await Course.create(courseData);
        return course;
    }

    /* FIND --------------------------------------------------------------------------------------------------- */

    async findCourseById(courseId, userId) {
        const course = await Course.findOne({_id: courseId}).lean();
        const isEnrolled = course.usersEnrolled.some(id => id == userId);
        course.isEnrolled = isEnrolled;
        return course;
    }

    async findAll() {
        const courses = await Course.find({})
            .sort({createdAt: 'desc'})
            .lean();

        const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        const locals = "en-US";

        return courses.map(c => {
            c.createdAt = c.createdAt.toLocaleDateString(locals, options);
            return c;
        });
    }

    async findTopEnroled(limit) {
        const courses = await Course.find({isPublic: true})
            .sort({usersEnrolled: 'desc'})
            .limit(limit)
            .lean();

        const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        const locals = "en-US";

        return courses.map(c => {
            c.createdAt = c.createdAt.toLocaleDateString(locals, options);
            return c;
        });
    }

    /* EDIT ------------------------------------------------------------------------------------------------- */

    async editCourse(courseId, courseData) {
        return Course.updateOne({_id: courseId}, courseData).lean();
    }

    async enrollUser(courseId, userId) {

        /* Patch the user */
        const user = await User.findById(userId);
        user.enrolledCourses.push(courseId);
        await user.save();

        /* Patch the course */
        const course = await Course.findById(courseId);
        course.usersEnrolled.push(userId);
        return course.save();
    }

    /* DELETE ------------------------------------------------------------------------------------------------- */

    async deleteCourseConfirm(courseId) {
        const course = await Course.deleteOne({_id: courseId});
        return course;
    }
}

module.exports = CourseService;