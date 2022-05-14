package com.example.androidapp.components.feed

import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import com.example.androidapp.models.FeedElement

@Composable
fun FeedCaption(feedCaption: FeedElement.FeedCaption) {
    if (feedCaption.text != null) {
        Text(text = feedCaption.text)
    }
}
