package com.example.androidapp.signals

import com.example.androidapp.models.Signal
import io.reactivex.rxjava3.subjects.PublishSubject

data class SignalRegistryItem(
    val signal: Signal,
    val observer: PublishSubject<SignalEvent>
)
