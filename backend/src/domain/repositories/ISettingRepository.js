// Interface for Setting Repository (Domain Layer)
class ISettingRepository {
  async findAll() { throw new Error('Not implemented'); }
  async update(id, data) { throw new Error('Not implemented'); }
  async findOneByCondition(condition) { throw new Error('Not implemented'); }
}

module.exports = ISettingRepository;
