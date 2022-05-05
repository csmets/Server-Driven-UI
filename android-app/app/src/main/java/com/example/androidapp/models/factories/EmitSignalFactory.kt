package com.example.androidapp.models.factories

import com.example.androidapp.models.SignalValue
import com.example.androidapp.models.SignalValuePair
import fragment.EmitSignal

fun interface EmitSignalFactory {
    fun create(emitSignal: EmitSignal?): com.example.androidapp.models.EmitSignal?
}

val emitSignalFactory = EmitSignalFactory {
    if (it?.signal == null) {
        return@EmitSignalFactory null
    }

    val values = it.values

    return@EmitSignalFactory com.example.androidapp.models.EmitSignal(
        signal = signalFactory.create(it.signal!!.fragments.signal)!!,
        values = values.map { emitSignalValue ->
            val pair = emitSignalValue.fragments.signalValuePair
            SignalValuePair(key = pair.key, value =  pair.value)
        }
    )
}