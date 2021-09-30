package com.example.androidapp.models

enum class ColumnAlignment {
    LEFT,
    RIGHT,
    CENTER
}

interface Column {
    val align: ColumnAlignment
}