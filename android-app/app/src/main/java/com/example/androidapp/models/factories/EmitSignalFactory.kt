package com.example.androidapp.models.factories

import com.example.androidapp.models.EmitSignal
import com.example.androidapp.models.SignalValuePair
import com.example.androidapp.models.SignalValuePairKey
import com.example.androidapp.models.toSignalValuePairKey
import org.json.JSONObject
import javax.inject.Inject

fun interface EmitSignalFactory {
    fun create(emitSignal: JSONObject?): EmitSignal?
}

class EmitSignalFactoryImpl @Inject constructor(
    private val signalFactory: SignalFactory
): EmitSignalFactory {
    override fun create(emitSignal: JSONObject?): EmitSignal? {
        if (emitSignal == null) {
            return null
        }

        val values = emitSignal.getJSONArray("values").let {
            var index = 0
            val esValues = mutableListOf<SignalValuePair>()
            while (index < it.length()) {
                val pair = it.getJSONObject(index)
                val key = pair.getString("key").toSignalValuePairKey()
                val value = pair.getString("value")

                if (key != SignalValuePairKey.UNKNOWN && value.isNotEmpty()) {
                    esValues.add(
                        SignalValuePair(
                            key = key,
                            value = value
                        )
                    )
                }
                index++
            }
            esValues
        }

        return EmitSignal(
            signal = signalFactory.create(emitSignal.getJSONObject("signal"))!!,
            values = values
        )
    }
}