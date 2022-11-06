package com.example.androidapp.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.ButtonElevation
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.platform.UriHandler
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.androidapp.models.*

@Composable
fun Button(data: ContainerElement.Button) {
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
                ButtonTheme.SUCCESS -> BorderStroke(1.dp, Color(0xFF2E7D32))
                ButtonTheme.ERROR -> BorderStroke(1.dp, MaterialTheme.colors.error)
            }
        } else {
            null
        },
        modifier = when(data.size) {
            ButtonSize.SMALL -> Modifier.height(30.dp).width(80.dp)
            ButtonSize.MEDIUM -> Modifier
            ButtonSize.LARGE -> Modifier.height(60.dp).width(180.dp)
        }
    ) {
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

@Preview
@Composable
fun ButtonPreview() {
    Button(data = ContainerElement.Button(
        label = "Button test",
        action = null,
        disabled = false,
        disableElevation = false,
        variant = ButtonVariant.CONTAINED,
        theme = ButtonTheme.PRIMARY,
        size = ButtonSize.LARGE
    ))
}