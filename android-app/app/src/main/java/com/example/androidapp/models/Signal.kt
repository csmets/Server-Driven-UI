package com.example.androidapp.models

import kotlinx.serialization.Serializable
import type.SignalValuePairKey

@Serializable
data class Signal(val type: SignalType, val reference: String?)

enum class SignalType {
    FAVOURITE,
    FAVOURITE_COUNT,
    TITLE,
    ERROR
}

@Serializable
data class EmitSignal(val signal: Signal, val values: List<SignalValuePair>?)

@Serializable
data class SignalValuePair(
    val key: SignalValuePairKey,
    val value: String
)

@Serializable
sealed class SignalValue {

    @Serializable
    data class SignalStringValue(
        val text: String
    ): SignalValue()
}