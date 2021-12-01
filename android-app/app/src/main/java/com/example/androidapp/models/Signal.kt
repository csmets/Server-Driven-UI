package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
data class Signal(val type: SignalType, val reference: String?)

enum class SignalType {
    FAVOURITE,
    FAVOURITE_COUNT,
    TOGGLE,
    TITLE,
    ERROR
}

@Serializable
data class EmitSignal(val signal: Signal, val value: SignalValue?)

@Serializable
sealed class SignalValue {

    @Serializable
    data class SignalStringValue(
        val text: String
    ): SignalValue()
}