package com.example.androidapp.components.feed

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import coil.annotation.ExperimentalCoilApi
import coil.compose.rememberImagePainter
import com.example.androidapp.models.FeedColumn
import com.example.androidapp.models.SignalValuePairKey

@ExperimentalCoilApi
@Composable
fun FeedFavourite(feedFavourite: FeedColumn.FeedFavourite, viewModel: FeedFavouriteViewModel = hiltViewModel()) {
    var isSaved by remember {
        mutableStateOf(false)
    }
    var icon by remember {
        mutableStateOf(feedFavourite.icon)
    }

    feedFavourite.signal?.let {
        viewModel.listenTo(it).subscribe { event ->
            event.values?.forEach { value ->
                if (value.key == SignalValuePairKey.ICON) {
                    icon = value.value
                }
            }
        }
    }

    Column(horizontalAlignment = getAlignment(feedFavourite.align)) {
        Image(
            painter = rememberImagePainter(icon),
            contentDescription = "",
            modifier = Modifier
                .size(24.dp)
                .clickable {
                    if (isSaved) {
                        feedFavourite.action.unsave?.let { viewModel.emitSignals(it) }
                        isSaved = !isSaved
                    } else {
                        feedFavourite.action.save?.let { viewModel.emitSignals(it) }
                        isSaved = !isSaved
                    }
                }
        )
    }
}
