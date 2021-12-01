package com.example.androidapp.signal

import com.example.androidapp.models.EmitSignal
import com.example.androidapp.models.Signal
import io.reactivex.rxjava3.subjects.PublishSubject
import javax.inject.Inject

interface SignalProvider {
    fun registerSignal(signal: Signal): PublishSubject<SignalEvent>
    fun emitSignals(emitSignals: List<EmitSignal>)
}

class SignalProviderImpl @Inject constructor(): SignalProvider {

    private val signalsRegistry: MutableList<SignalRegister> = mutableListOf()

    override fun registerSignal(signal: Signal): PublishSubject<SignalEvent> {
        val observer = PublishSubject.create<SignalEvent>()
        signalsRegistry.add(
            SignalRegister(
                signal = signal,
                observer = observer
            )
        )
        return observer
    }

    override fun emitSignals(emitSignals: List<EmitSignal>) {
        val foundSignals = signalsRegistry.filter { signal ->
            emitSignals.forEach { emitSignal ->
                if (emitSignal.signal.type == signal.signal.type) {
                    return@filter true
                }
            }
            return@filter false
        }

        foundSignals.forEach { signalRegister ->
            emitSignals.forEach { emitSignal ->
                if (signalRegister.signal.reference == emitSignal.signal.reference) {
                    if (emitSignal.value != null) {
                        signalRegister.observer.onNext(SignalEvent(result = emitSignal.value))
                    }
                }
            }
        }
    }
}