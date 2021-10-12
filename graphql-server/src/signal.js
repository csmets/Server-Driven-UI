const stateKeyEnum = {
  SAVED: "SAVED",
  UNSAVED: "UNSAVED",
  ERROR: "ERROR",
  UPDATED: "UPDATED"
};

const state = (key, value) => {
  return {
    key,
    value
  }
}

const signal = (signalId, ...values) => {
  return {
    signalId,
    states: [
      state(stateKeyEnum.SAVED, values[0]),
      state(stateKeyEnum.ERROR, values[1])
    ]
  }
}

module.exports = {
  signal,
  state,
  stateKeyEnum
}