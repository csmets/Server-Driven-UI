const stateKeyEnum = {
  OK: "OK",
  ERROR: "ERROR"
};

const state = (key, value) => {
  return {
    key,
    value
  }
}

const signal = (id) => {
  return {
    id,
    states: [
      state(stateKeyEnum.OK, "Successfully saved"),
      state(stateKeyEnum.ERROR, "Failed!")
    ]
  }
}

module.exports = {
  signal
}