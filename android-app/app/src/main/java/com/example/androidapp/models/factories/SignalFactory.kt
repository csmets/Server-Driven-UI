package com.example.androidapp.models.factories

import com.example.androidapp.models.*
import org.json.JSONObject
import javax.inject.Inject

fun interface SignalFactory {
    fun create(signal: JSONObject?): Signal?
}

class SignalFactoryImpl @Inject constructor(): SignalFactory {

    override fun create(signal: JSONObject?): Signal? {
        if (signal == null) {
            return null
        }

        return Signal(
            type = signal.getString("type").toSignalType(),
            reference = signal.getString("reference")
        )
    }
}