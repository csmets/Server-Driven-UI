package com.example.androidapp.models.factories

import com.example.androidapp.models.Signal
import com.example.androidapp.models.SignalType
import com.example.androidapp.models.SignalValue

fun interface SignalFactory {
    fun create(signal: fragment.Signal?): Signal?
}

val signalFactory = SignalFactory {

    if (it == null) {
        return@SignalFactory null
    }

    val fallbackValue = getFallbackValue(it.fallback)

    return@SignalFactory Signal(
        type = mapSignalType(it.type),
        reference = it.reference,
        fallback = fallbackValue?.let { fallbackValue }
    )
}

fun getFallbackValue(fallback: fragment.Signal.Fallback?): SignalValue? {
    val stringValue = fallback?.fragments?.signalStringValue
    return when {
        stringValue != null -> stringValue.text?.let { text -> SignalValue.SignalStringValue(text) }
        else -> null
    }
}

fun mapSignalType(type: type.SignalType): SignalType {
    return when(type.name) {
        "FAVOURITE" -> SignalType.FAVOURITE
        "FAVOURITE_COUNT" -> SignalType.FAVOURITE_COUNT
        "TITLE" -> SignalType.TITLE
        "ERROR" -> SignalType.ERROR
        else -> SignalType.ERROR
    }
}