package com.example.androidapp.components.hackernews

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.androidapp.components.Container
import com.example.androidapp.models.ViewElement

@Composable
fun HackerNews(viewModel: HackerNewsViewModel = viewModel()) {
    val hackerNews = viewModel.hackerNews.observeAsState()
    val view = hackerNews.value?.view

    Row {
        Column(modifier = Modifier
            .fillMaxWidth()
            .fillMaxHeight()
            .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            view?.elements?.forEach {
                when(it) {
                    is ViewElement.Container -> Container(it)
                }
            }
        }
    }
}