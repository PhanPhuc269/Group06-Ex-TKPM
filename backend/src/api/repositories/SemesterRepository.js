const Semester = require('../models/Semester');

class SemesterRepository {
  async findAll() {
    return await Semester.find({});
  }

  async create(data) {
    const newSemester = new Semester(data);
    return await newSemester.save();
  }

  async update(id, data) {
    return await Semester.updateOne({ id }, { $set: data });
  }

  async delete(id) {
    return await Semester.deleteOne({ id });
  }

  async findOneByCondition(condition) {
    return await Semester.findOne(condition);
  }
}

module.exports = new SemesterRepository();