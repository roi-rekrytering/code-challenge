class Relation {
  constructor () {
    this.relations = new Map();
  }

  /**
   * @param int companyId
   * @param int userId
   */
  add(companyId, userId) {
    if (!this.relations.has(companyId)) {
      this.relations.set(companyId, new Set());
    }

    this.relations.get(companyId).add(userId);
  }

  /**
   * @return Map
   */
  get () {
    return this.relations;
  }
}

module.exports = Relation;
