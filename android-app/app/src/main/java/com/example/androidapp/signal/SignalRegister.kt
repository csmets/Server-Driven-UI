package com.example.androidapp.signal

import com.example.androidapp.models.Signal
import io.reactivex.rxjava3.subjects.PublishSubject

data class SignalRegister(val signal: Signal, val observer: PublishSubject<SignalEvent>)
