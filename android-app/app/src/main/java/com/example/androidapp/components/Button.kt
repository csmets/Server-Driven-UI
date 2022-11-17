package com.example.androidapp.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.platform.UriHandler
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import coil.annotation.ExperimentalCoilApi
import coil.compose.rememberImagePainter
import com.example.androidapp.components.feed.FeedFavouriteViewModel
import com.example.androidapp.models.*

@ExperimentalCoilApi
@Composable
fun Button(data: Buttons) {
    when (data) {
        is Buttons.Button -> GeneralButton(data = data)
        is Buttons.FavouriteButton -> FavouriteButton(data = data)
    }
}

@ExperimentalCoilApi
@Composable
fun GeneralButton(data: Buttons.Button) {
    val uriHandler = LocalUriHandler.current

    androidx.compose.material.Button(
        onClick = { actionHandler(action = data.action, handler = uriHandler) },
        elevation = setElevation(disableElevation = data.disableElevation),
        enabled = !data.disabled,
        colors = if (data.variant == ButtonVariant.CONTAINED) {
            ButtonDefaults.buttonColors(backgroundColor = MaterialTheme.colors.primary)
        } else {
            ButtonDefaults.buttonColors(backgroundColor = MaterialTheme.colors.background)
        },
        border = if (data.variant == ButtonVariant.OUTLINED) {
            when (data.theme) {
                ButtonTheme.PRIMARY -> BorderStroke(1.dp, MaterialTheme.colors.primary)
                ButtonTheme.SECONDARY -> BorderStroke(1.dp, MaterialTheme.colors.secondary)
                ButtonTheme.SUCCESS -> BorderStroke(1.dp, Color(Colors.Success))
                ButtonTheme.ERROR -> BorderStroke(1.dp, MaterialTheme.colors.error)
            }
        } else {
            null
        },
        modifier = when(data.size) {
            ButtonSize.SMALL -> Modifier
                .height(30.dp)
                .width(80.dp)
            ButtonSize.MEDIUM -> Modifier
            ButtonSize.LARGE -> Modifier
                .height(60.dp)
                .width(180.dp)
        }
    ) {
        if (data.icon != null) {
            Image(
                painter = rememberImagePainter(data.icon),
                contentDescription = "",
                alignment = Alignment.Center,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .size(24.dp)
            )
        }
        Text(text = data.label,
            color = if (data.variant == ButtonVariant.CONTAINED) {
                MaterialTheme.colors.onPrimary
            } else {
                when (data.theme) {
                    ButtonTheme.PRIMARY -> MaterialTheme.colors.primary
                    ButtonTheme.SECONDARY -> MaterialTheme.colors.secondary
                    ButtonTheme.SUCCESS -> Color(0xFF2E7D32)
                    ButtonTheme.ERROR -> MaterialTheme.colors.error
                }
            },
            fontSize = when (data.size) {
                ButtonSize.SMALL -> MaterialTheme.typography.button.fontSize.div(2)
                ButtonSize.MEDIUM -> MaterialTheme.typography.button.fontSize
                ButtonSize.LARGE -> MaterialTheme.typography.h3.fontSize.times(0.5)
            }
        )
    }
}

@ExperimentalCoilApi
@Composable
fun FavouriteButton(data: Buttons.FavouriteButton, viewModel: FeedFavouriteViewModel = hiltViewModel()) {
    var isSaved by remember {
        mutableStateOf(false)
    }
    var icon by remember {
        mutableStateOf(data.icon)
    }

    data.signal?.let {
        viewModel.listenTo(it).subscribe { event ->
            event.values?.forEach { value ->
                if (value.key == SignalValuePairKey.ICON) {
                    if (value.value is SignalValue.SignalStringValue) {
                        icon = value.value.text
                    }
                }
            }
        }
    }

    androidx.compose.material.Button(
        onClick = {
            when(data.action) {
                is Action.FavouriteAction -> {
                    if (isSaved) {
                        data.action.unsave?.let { viewModel.emitSignals(it) }
                        isSaved = !isSaved
                    } else {
                        data.action.save?.let { viewModel.emitSignals(it) }
                        isSaved = !isSaved
                    }
                }
                else -> Unit
            }
        },
        elevation = setElevation(disableElevation = true),
        enabled = !data.disabled,
        colors = ButtonDefaults.buttonColors(backgroundColor = MaterialTheme.colors.background)
    ) {
        Image(
            painter = rememberImagePainter(data.icon),
            contentDescription = "",
            alignment = Alignment.Center,
            contentScale = ContentScale.Crop,
            modifier = Modifier.size(24.dp).padding(6.dp)
        )
    }
}

private fun actionHandler(action: Action?, handler: UriHandler) {
    if (action != null) {
        when(action) {
            is Action.URLAction -> {
                handler.openUri(action.url)
            }
        }
    }
}

@Composable
private fun setElevation(disableElevation: Boolean): ButtonElevation? {
    return if (disableElevation) {
        null
    } else {
        ButtonDefaults.elevation(
            defaultElevation = 10.dp,
            pressedElevation = 15.dp,
            disabledElevation = 0.dp
        )
    }
}

@ExperimentalCoilApi
@Preview
@Composable
fun ButtonPreview() {
    Button(data = Buttons.Button(
        label = "Button test",
        action = null,
        disabled = false,
        disableElevation = false,
        variant = ButtonVariant.CONTAINED,
        theme = ButtonTheme.PRIMARY,
        size = ButtonSize.LARGE,
        icon = null
    ))
}