package com.example.androidapp.models.factories

import com.example.androidapp.models.SignalValuePair
import fragment.EmitSignal
import javax.inject.Inject

fun interface EmitSignalFactory {
    fun create(emitSignal: EmitSignal?): com.example.androidapp.models.EmitSignal?
}

class EmitSignalFactoryImpl @Inject constructor(
    private val signalFactory: SignalFactory
): EmitSignalFactory {
    override fun create(emitSignal: EmitSignal?): com.example.androidapp.models.EmitSignal? {
        if (emitSignal?.signal == null) {
            return null
        }

        val values = emitSignal.values

        return com.example.androidapp.models.EmitSignal(
            signal = signalFactory.create(emitSignal.signal!!.fragments.signal)!!,
            values = values.map { emitSignalValue ->
                val pair = emitSignalValue.fragments.signalValuePair
                SignalValuePair(key = pair.key, value =  pair.value)
            }
        )
    }
}