package com.example.androidapp.components.typography

import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.example.androidapp.models.ContainerElement
import com.example.androidapp.models.TypographyVariant
import java.util.*

@Composable
fun Typography(data: ContainerElement.Typography) {
    when (data.variant) {
        TypographyVariant.H1 -> {
            Text(text = data.value, fontSize = 96.sp, fontWeight = FontWeight.W300)
        }
        TypographyVariant.H2 -> {
            Text(text = data.value, fontSize = 60.sp, fontWeight = FontWeight.W300)
        }
        TypographyVariant.H3 -> {
            Text(text = data.value, fontSize = 48.sp, fontWeight = FontWeight.W400)
        }
        TypographyVariant.H4 -> {
            Text(text = data.value, fontSize = 34.sp, fontWeight = FontWeight.W400)
        }
        TypographyVariant.H5 -> {
            Text(text = data.value, fontSize = 24.sp, fontWeight = FontWeight.W400)
        }
        TypographyVariant.H6 -> {
            Text(text = data.value, fontSize = 20.sp, fontWeight = FontWeight.W500)
        }
        TypographyVariant.SUBTITLE1 -> {
            Text(text = data.value, fontSize = 16.sp, fontWeight = FontWeight.W400)
        }
        TypographyVariant.SUBTITLE2 -> {
            Text(text = data.value, fontSize = 14.sp, fontWeight = FontWeight.W500)
        }
        TypographyVariant.BODY1 -> {
            Text(text = data.value, fontSize = 16.sp, fontWeight = FontWeight.W400)
        }
        TypographyVariant.BODY2 -> {
            Text(text = data.value, fontSize = 14.sp, fontWeight = FontWeight.W400)
        }
        TypographyVariant.CAPTION -> {
            Text(text = data.value, fontSize = 12.sp, fontWeight = FontWeight.W400)
        }
        TypographyVariant.OVERLINE -> {
            Text(
                text = data.value.uppercase(Locale("en_US")),
                fontSize = 12.sp,
                fontWeight = FontWeight.W400
            )
        }
    }
}