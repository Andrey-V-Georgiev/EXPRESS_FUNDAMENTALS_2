const Course = require('../models/Course');
const User = require('../models/User');


class CourseService {

    constructor() { }

    async findCourseById(courseId, userId) {
        const course = await Course.findOne({_id: courseId}).populate('usersEnrolled').lean();
        const isEnrolled = course.usersEnrolled.some(u => u._id == userId);
        course.isEnrolled = isEnrolled; 
        return course;
    }

    async createCourse(courseData) {
        const course = await Course.create(courseData);
        return course;
    }

    async findAll() {
        const courses = await Course.find({})
            .populate('usersEnrolled')
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
        // const courses = await Course.find({}).sort({createdAt: 'desc'}).lean();
        // const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        // const locals = "en-US";

        // return courses.map(c => {
        //     c.createdAt = c.createdAt.toLocaleDateString(locals, options);
        //     return c;
        // });
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

    async isEnrolled(courseId, userId) {
    
    }
}

module.exports = CourseService;