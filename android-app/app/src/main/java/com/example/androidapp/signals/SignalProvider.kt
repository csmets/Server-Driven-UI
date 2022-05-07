package com.example.androidapp.signals

import com.example.androidapp.models.EmitSignal
import com.example.androidapp.models.Signal
import io.reactivex.rxjava3.subjects.PublishSubject
import javax.inject.Inject

interface SignalProvider {
    fun register(signal: Signal): PublishSubject<SignalEvent>
    fun emit(emitSignals: List<EmitSignal>)
}

class SignalProviderImpl @Inject constructor(
    private val registry: SignalRegistry
): SignalProvider {

    override fun register(signal: Signal): PublishSubject<SignalEvent> {
        val existingSignal = registry.get(signal)
        if (existingSignal != null) {
            return existingSignal.observer
        }
        return registry.add(signal)
    }

    override fun emit(emitSignals: List<EmitSignal>) {
        emitSignals.forEach {
            registry.get(it.signal)?.let { registryItem ->
                emitSignal(registryItem, it)
            }
        }
    }

    private fun emitSignal(registryItem: SignalRegistryItem, emitSignal: EmitSignal) {
        registryItem.observer.onNext(SignalEvent(emitSignal.signal.type, emitSignal.values))
    }
}