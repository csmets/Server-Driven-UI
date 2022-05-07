package com.example.androidapp.components.feed

import androidx.lifecycle.ViewModel
import com.example.androidapp.models.EmitSignal
import com.example.androidapp.models.Signal
import com.example.androidapp.signals.SignalEvent
import com.example.androidapp.signals.SignalProvider
import dagger.hilt.android.lifecycle.HiltViewModel
import io.reactivex.rxjava3.subjects.PublishSubject
import javax.inject.Inject

@HiltViewModel
class FeedFavouriteViewModel @Inject constructor(
    private val signalProvider: SignalProvider
): ViewModel() {

    fun emitSignals(signals: List<EmitSignal>) {
        signalProvider.emit(signals)
    }

    fun listenTo(signal: Signal): PublishSubject<SignalEvent> {
        return signalProvider.register(signal)
    }
}