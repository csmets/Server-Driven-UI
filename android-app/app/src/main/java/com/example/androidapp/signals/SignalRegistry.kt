package com.example.androidapp.signals

import com.example.androidapp.models.Signal
import com.example.androidapp.models.key
import io.reactivex.rxjava3.subjects.PublishSubject
import javax.inject.Inject

interface SignalRegistry {
    fun add(signal: Signal): PublishSubject<SignalEvent>
    fun get(signal: Signal): SignalRegistryItem?
}

class SignalRegistryImpl @Inject constructor(): SignalRegistry {

    override fun add(signal: Signal): PublishSubject<SignalEvent> {
        val key = signal.key()
        return if (registry.containsKey(key)) {
            get(signal)!!.observer
        } else {
            val observer = PublishSubject.create<SignalEvent>()
            registry[key] = SignalRegistryItem(
                signal = signal,
                observer = observer
            )
            observer
        }
    }

    override fun get(signal: Signal): SignalRegistryItem? {
        return registry[signal.key()]
    }

    companion object {
        val registry: MutableMap<String, SignalRegistryItem> = mutableMapOf()

        operator fun invoke() = synchronized(this) {
            registry
        }
    }
}