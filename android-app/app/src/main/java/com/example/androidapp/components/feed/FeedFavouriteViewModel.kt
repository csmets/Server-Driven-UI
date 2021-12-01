package com.example.androidapp.components.feed

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.androidapp.models.Column
import com.example.androidapp.models.Signal
import com.example.androidapp.models.SignalValue
import com.example.androidapp.signal.SignalProvider
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class FeedFavouriteViewModel @Inject constructor(
    private val signalProvider: SignalProvider
): ViewModel() {

    private val _icon = MutableLiveData<String>()
    val icon: LiveData<String> = _icon
    private var save = true

    fun setup(feedFavourite: Column.FeedFavourite) {
        _icon.value = feedFavourite.icon
        if (feedFavourite.signal != null) {
            setupSignal(feedFavourite.signal)
        }
    }

    fun onClickEvent(feedFavourite: Column.FeedFavourite) {
        if (save) {
            save = false
            feedFavourite.save.emitSignals?.let { signalProvider.emitSignals(it) }
        } else {
            save = true
            feedFavourite.unsave.emitSignals?.let { signalProvider.emitSignals(it) }
        }
    }

    private fun setupSignal(signal: Signal) {
        val observer = signalProvider.registerSignal(signal)
        observer.subscribe {
            val text = (it.result as SignalValue.SignalStringValue).text
            _icon.value = text
        }
    }
}