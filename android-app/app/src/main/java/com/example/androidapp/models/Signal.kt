package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
data class Signal(val type: SignalType, val reference: String?)

fun Signal.key(): String {
    return type.toString() + reference
}

enum class SignalType {
    TOGGLE,
    UPDATE,
    TITLE,
    ERROR
}

fun String.toSignalType(): SignalType {
    return when(this) {
        "TOGGLE" -> SignalType.TOGGLE
        "UPDATE" -> SignalType.UPDATE
        "TITLE" -> SignalType.TITLE
        "ERROR" -> SignalType.ERROR
        else -> SignalType.ERROR
    }
}

@Serializable
data class EmitSignal(val signal: Signal, val values: List<SignalValuePair>?)

enum class SignalValuePairKey {
    CONTENT,
    ICON,
    PRIMARY,
    UNKNOWN
}

fun String.toSignalValuePairKey(): SignalValuePairKey {
    return when(this) {
        "CONTENT" -> SignalValuePairKey.CONTENT
        "ICON" -> SignalValuePairKey.ICON
        "PRIMARY" -> SignalValuePairKey.PRIMARY
        else -> SignalValuePairKey.UNKNOWN
    }
}

@Serializable
data class SignalValuePair(
    val key: SignalValuePairKey,
    val value: SignalValue
)

@Serializable
sealed class SignalValue {

    @Serializable
    data class SignalStringValue(
        val text: String
    ): SignalValue()

    @Serializable
    data class SignalArrayValue(
        val prefix: List<String>?,
        val suffix: List<String>?,
        val array: List<String>?
    ): SignalValue()
}