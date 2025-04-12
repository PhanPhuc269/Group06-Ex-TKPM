
const StudentRouter=require('./student');
const FacultyRouter=require('./faculty');
const ProgramRouter=require('./program');
const StatusRouter=require('./status');
const LogRouter=require('./log');
const SettingRouter=require('./setting');
const ClassSectionRouter=require('./classSection');
const RegistrationRouter=require('./registration');
const SemesterRouter=require('./semester');
const CourseRouter=require('./course');

function router(app)
{
    app.use('/api/students', StudentRouter);
    app.use('/api/faculties', FacultyRouter);
    app.use('/api/programs', ProgramRouter);
    app.use('/api/statuses', StatusRouter);
    app.use('/api/logs', LogRouter);
    app.use('/api/settings', SettingRouter);
    app.use('/api/class-sections', ClassSectionRouter);
    app.use('/api/registrations', RegistrationRouter);
    app.use('/api/semesters', SemesterRouter);
    app.use('/api/courses', CourseRouter);
    

}

module.exports = router