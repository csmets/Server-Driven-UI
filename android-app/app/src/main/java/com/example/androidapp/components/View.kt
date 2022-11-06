package com.example.androidapp.components

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.example.androidapp.models.ViewElement
import com.example.androidapp.models.ViewResponse

@Composable
fun View(viewResponse: ViewResponse?){
    Row {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight()
                .verticalScroll(rememberScrollState()),
        ) {
            viewResponse?.elements?.forEach {
                when (it) {
                    is ViewElement.Container -> Container(it)
                }
            }
        }
    }
}