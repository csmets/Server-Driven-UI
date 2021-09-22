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

const signal = (signalId, ok, error) => {
  return {
    signalId,
    states: [
      state(stateKeyEnum.OK, ok),
      state(stateKeyEnum.ERROR, error)
    ]
  }
}

module.exports = {
  signal
}