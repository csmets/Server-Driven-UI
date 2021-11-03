package com.example.androidapp.models.factories

import com.example.androidapp.models.SignalValue
import fragment.Signal

fun interface SignalValueFactory {
    fun create(signalValue: Signal.Fallback): SignalValue?
}

val signalValueFactory = SignalValueFactory {
    val stringValue = it.fragments.signalStringValue
    return@SignalValueFactory when {
        stringValue != null -> stringValue.text?.let { text -> SignalValue.SignalStringValue(text) }
        else -> null
    }
}