package com.example.androidapp.components.feed

import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.example.androidapp.models.FeedViewElement

@Composable
fun FeedHeading(heading: FeedViewElement.FeedHeading) {
    Text(
        text = heading.primary,
        fontWeight = FontWeight(600),
        fontSize = 24.sp
    )
}
