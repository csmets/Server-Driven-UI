package com.example.androidapp.components.feed

import androidx.compose.runtime.Composable

@Composable
fun Feed() {
    val viewModel = FeedViewModel()
    viewModel.getResponse()
}