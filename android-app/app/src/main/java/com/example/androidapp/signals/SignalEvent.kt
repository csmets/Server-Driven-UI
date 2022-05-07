package com.example.androidapp.signals

import com.example.androidapp.models.SignalType
import com.example.androidapp.models.SignalValuePair

data class SignalEvent(val type: SignalType, val values: List<SignalValuePair>?)
