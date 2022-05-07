package com.example.androidapp.models.factories

import com.example.androidapp.models.Signal
import com.example.androidapp.models.SignalType
import com.example.androidapp.models.SignalValue
import com.example.androidapp.models.map
import javax.inject.Inject

fun interface SignalFactory {
    fun create(signal: fragment.Signal?): Signal?
}

class SignalFactoryImpl @Inject constructor(): SignalFactory {

    override fun create(signal: fragment.Signal?): Signal? {
        if (signal == null) {
            return null
        }

        return Signal(
            type = signal.type.map(),
            reference = signal.reference
        )
    }
}