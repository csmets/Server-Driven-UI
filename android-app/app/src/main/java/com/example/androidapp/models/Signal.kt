package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
data class Signal(val type: SignalType, val reference: String?)

fun Signal.key(): String {
    return type.toString() + reference
}

enum class SignalType {
    FAVOURITE,
    FAVOURITE_COUNT,
    TITLE,
    ERROR
}

fun String.toSignalType(): SignalType {
    return when(this) {
        "FAVOURITE" -> SignalType.FAVOURITE
        "FAVOURITE_COUNT" -> SignalType.FAVOURITE_COUNT
        "TITLE" -> SignalType.TITLE
        "ERROR" -> SignalType.ERROR
        else -> SignalType.ERROR
    }
}

@Serializable
data class EmitSignal(val signal: Signal, val values: List<SignalValuePair>?)

enum class SignalValuePairKey {
    COUNT,
    ICON,
    TOGGLE,
    UNKNOWN
}

fun String.toSignalValuePairKey(): SignalValuePairKey {
    return when(this) {
        "COUNT" -> SignalValuePairKey.COUNT
        "ICON" -> SignalValuePairKey.ICON
        "TOGGLE" -> SignalValuePairKey.TOGGLE
        else -> SignalValuePairKey.UNKNOWN
    }
}

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