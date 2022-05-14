package com.example.androidapp.components.typography

import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import com.example.androidapp.models.FeedViewElement

@Composable
fun TypographyContent(typographyContent: FeedViewElement.TypographyContent) {
    typographyContent.paragraphs.forEach {
        Text(text = it.text)
    }
}
