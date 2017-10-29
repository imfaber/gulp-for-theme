module.exports = {

  /**
   * Returns the list of enabled tasks.
   *
   * @returns {Array}
   */
  getEnabledTasks() {
    const enabledTasks = [];
    for (let [key, value] of Object.entries(TASK_CONFIG)) {
      if (typeof value === 'object' && value.enable) {
        enabledTasks.push(key);
      }
    }
    return enabledTasks;
  },

  /**
   * Check wether the given task is enabled.
   *
   * @param task
   * @returns {boolean}
   */
  isTaskEnabled(task) {
    return (this.getEnabledTasks().indexOf(task) >= 0);
  }

};
