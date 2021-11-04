package com.example.androidapp.models.factories

import com.example.androidapp.models.SignalValue
import fragment.EmitSignal

fun interface EmitSignalFactory {
    fun create(emitSignal: EmitSignal?): com.example.androidapp.models.EmitSignal?
}

val emitSignalFactory = EmitSignalFactory {
    if (it?.signal == null) {
        return@EmitSignalFactory null
    }

    val value = it.value?.fragments?.signalStringValue?.text
    return@EmitSignalFactory com.example.androidapp.models.EmitSignal(
        signal = signalFactory.create(it.signal!!.fragments.signal)!!,
        value = value?.let { SignalValue.SignalStringValue(value) }
    )
}