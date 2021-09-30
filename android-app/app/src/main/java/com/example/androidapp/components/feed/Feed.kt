package com.example.androidapp.components.feed

import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

@Composable
fun Feed() {
    val viewModel = FeedViewModel(LocalContext.current)
    viewModel.getResponse()
}