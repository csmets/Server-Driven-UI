package com.example.androidapp.components.feed

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import coil.annotation.ExperimentalCoilApi
import coil.compose.rememberImagePainter
import com.example.androidapp.models.FeedElement

@ExperimentalCoilApi
@Composable
fun FeedImage(feedImage: FeedElement.FeedImage) {
    Image(
        painter = rememberImagePainter(feedImage.src),
        contentDescription = feedImage.alt,
        modifier = Modifier
            .fillMaxSize()
            .height(200.dp),
        alignment = Alignment.Center,
        contentScale = ContentScale.Crop
    )
}
