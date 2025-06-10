// ProgramRepository implements IProgramRepository (Infrastructure Layer)
const IProgramRepository = require('@domain/repositories/IProgramRepository');

const Program = require('@domain/entities/Program');
const Counter = require('@domain/entities/Counter');

class ProgramRepository extends IProgramRepository {
  async findAll() {
    return await Program.find({});
  }

  async create(data) {
    const newProgram = new Program(data);
    return await newProgram.save();
  }

  async update(id, data) {
    return await Program.updateOne({ id }, { $set: data });
  }

  async delete(id) {
    return await Program.deleteOne({ id });
  }
  async findOneByCondition(condition) {
    return await Program.findOne(condition);
  }
  async getNextId() {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: 'program_id' },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );
      return `program-${counter.value}`;
    } catch (error) {
      throw new Error('Lỗi khi tạo mã chương trình: ' + error.message);
    }
  }
}
module.exports = ProgramRepository;
