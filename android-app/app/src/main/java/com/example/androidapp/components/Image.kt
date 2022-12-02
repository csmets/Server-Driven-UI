package com.example.androidapp.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import coil.annotation.ExperimentalCoilApi
import coil.compose.rememberImagePainter
import com.example.androidapp.models.Image


@ExperimentalCoilApi
@Composable
fun ImageComponent(image: Image) {
    when {
        image.height != null && image.width == null ->
            HeightImage(url = image.url, alt = image.alt, height = image.height)
        image.height == null && image.width != null ->
            WidthImage(url = image.url, alt = image.alt, width = image.width)
        image.height != null && image.width != null ->
            FullImage(url = image.url, alt = image.alt, width = image.width, height = image.height)
        else -> FallbackImage(url = image.url, alt = image.alt)
    }
}

@ExperimentalCoilApi
@Composable
private fun FallbackImage(url: String, alt: String) {
    Image(
        painter = rememberImagePainter(url),
        contentDescription = alt,
        modifier = Modifier
            .fillMaxSize()
            .height(200.dp),
        alignment = Alignment.Center,
        contentScale = ContentScale.Crop
    )
}

@ExperimentalCoilApi
@Composable
private fun HeightImage(url: String, alt: String, height: Int) {
    Image(
        painter = rememberImagePainter(url),
        contentDescription = alt,
        modifier = Modifier
            .fillMaxWidth()
            .height(height.dp),
        alignment = Alignment.Center,
        contentScale = ContentScale.Crop
    )
}
@ExperimentalCoilApi
@Composable
private fun WidthImage(url: String, alt: String, width: Int) {
    Image(
        painter = rememberImagePainter(url),
        contentDescription = alt,
        modifier = Modifier
            .height(200.dp)
            .width(width.dp),
        alignment = Alignment.Center,
        contentScale = ContentScale.Crop
    )
}

@ExperimentalCoilApi
@Composable
private fun FullImage(url: String, alt: String, width: Int, height: Int) {
    Image(
        painter = rememberImagePainter(url),
        contentDescription = alt,
        modifier = Modifier
            .height(height.dp)
            .width(width.dp),
        alignment = Alignment.Center,
        contentScale = ContentScale.Crop
    )
}
