package com.example.androidapp.components.feed

import android.app.Application
import android.content.Context
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.androidapp.services.RemoteDataSource
import kotlinx.coroutines.launch

class FeedViewModel(context: Context): ViewModel() {

    fun getResponse() {
        viewModelScope.launch {
            val response = RemoteDataSource().getFeed()
            println(response)
        }
    }
}