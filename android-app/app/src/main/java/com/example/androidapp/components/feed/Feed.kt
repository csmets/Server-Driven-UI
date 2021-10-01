package com.example.androidapp.components.feed

import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.platform.LocalContext
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Composable
fun Feed(viewModel: FeedViewModel = FeedViewModel(LocalContext.current)) {
    val feed = viewModel.feed.observeAsState()
    println("response: " + Json.encodeToString(feed.value?.feedView))
}