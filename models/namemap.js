class NameMap {
  constructor () {
    this.key = 1;
    this.names = new Map();;
  }

  /**
   * @param string name
   * @return int
   */
  get(name) {
    return this.names.get(name);
  }

  /**
   * @param int id
   * @return string
   */
  getById(id) {
    var retval = '';
    this.names.forEach(function (nameId, name) {
      if (id == nameId) {
        retval = name;
        return true; 
      }
    }); 
    return retval;
  }

  /**
   * @param string name
   * @return bool
   */
  has(name) {
    return this.names.has(name);
  }

  /**
   * @param string name
   * @return bool
   */
  add(name) {
    if (this.has(name)) {
      return false;
    }

    this.names.set(name, this.key);
    this.key++;
    return true;
  }

  list() {
    this.names.forEach(function (key, name) {
      console.log(`${key} \t ${name}`);
    });
  }
}

module.exports = NameMap;
