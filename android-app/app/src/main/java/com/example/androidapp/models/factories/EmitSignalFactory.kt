package com.example.androidapp.models.factories

import com.example.androidapp.models.*
import com.example.androidapp.util.JsonUtil.makeStringArray
import org.json.JSONArray
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
                val value = pair.optJSONObject("value")

                if (key != SignalValuePairKey.UNKNOWN && value != null) {
                    esValues.add(
                        SignalValuePair(
                            key = key,
                            value = adaptValue(value)
                        )
                    )
                }
                index++
            }
            esValues
        }

        return EmitSignal(
            signal = signalFactory.create(emitSignal.getJSONObject("signal")),
            values = values
        )
    }

    private fun adaptValue(value: JSONObject): SignalValue {
        return when (value.getString("__typename")) {
            "SignalStringValue" -> SignalValue.SignalStringValue(
                text = value.getString("text")
            )
            "SignalArrayValue" -> SignalValue.SignalArrayValue(
                suffix = value.optJSONArray("suffix")?.let { makeStringArray(it) },
                prefix = value.optJSONArray("prefix")?.let { makeStringArray(it) },
                array = makeStringArray(value.getJSONArray("array"))
            )
            else -> SignalValue.SignalStringValue(
                text = ""
            )
        }
    }

}