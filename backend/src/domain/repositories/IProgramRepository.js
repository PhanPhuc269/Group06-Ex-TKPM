// Interface for Program Repository (Domain Layer)
class IProgramRepository {
  async findAll() { throw new Error('Not implemented'); }
  async create(data) { throw new Error('Not implemented'); }
  async update(id, data) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
  async findOneByCondition(condition) { throw new Error('Not implemented'); }
}

module.exports = IProgramRepository;
