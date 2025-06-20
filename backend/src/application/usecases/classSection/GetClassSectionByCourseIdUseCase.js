// Use case: Get class sections by courseId
const { addLogEntry } = require('@shared/utils/logging');

class GetClassSectionByCourseIdUseCase {
  /**
   * @param {object} params
   * @param {import('@domain/repositories/IClassSectionRepository')} params.classSectionRepository - Repository thao tác lớp học phần
   */
  constructor({ classSectionRepository }) {
    this.classSectionRepository = classSectionRepository;
  }

  async execute(courseId) {
    const classSections = await this.classSectionRepository.findOneByCondition({ courseId });
    if (!classSections) {
      await addLogEntry({ 
        message: "Không tìm thấy lớp học nào cho khóa học này", 
        level: "warn",
        action: 'get',
        entity: 'classSection',
        user: 'admin',
        details: 'No classSection found for courseId: ' + courseId
      });
      throw { status: 404, message: "Không tìm thấy lớp học nào cho khóa học này" };
    }
    return classSections;
  }
}

module.exports = GetClassSectionByCourseIdUseCase;
