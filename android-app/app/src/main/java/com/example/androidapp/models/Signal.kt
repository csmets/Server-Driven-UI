package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
data class Signal(val signalId: String, val states: List<State>)

enum class StateKey {
    OK,
    ERROR,
    NULL
}

@Serializable
data class State(val key: StateKey, val value: String?)

@Serializable
data class EmitSignal(val signalId: String, val key: StateKey)