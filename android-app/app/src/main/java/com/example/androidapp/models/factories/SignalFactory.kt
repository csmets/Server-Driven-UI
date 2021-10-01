package com.example.androidapp.models.factories

import com.example.androidapp.models.Signal
import com.example.androidapp.models.State
import com.example.androidapp.models.StateKey

fun interface SignalFactory {
    fun create(signal: fragment.Signal?): Signal?
}

val signalFactory = SignalFactory {
    val states = it?.states?.map { state ->
        return@map State(mapSignalStateKey(state.fragments.state.key), state.fragments.state.value)
    }

    if (it?.signalId == null || states == null) {
        return@SignalFactory null
    }

    return@SignalFactory Signal(it.signalId!!, states)
}

fun mapSignalStateKey(key: type.StateKey): StateKey {
    return when(key.name) {
        "OK" -> StateKey.OK
        "ERROR" -> StateKey.ERROR
        else -> StateKey.NULL
    }
}