package com.example.androidapp.data.kitchensink

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.TypeConverters
import com.example.androidapp.data.ViewTypeConverter
import com.example.androidapp.models.ViewResponse

@Entity(tableName = "kitchen_sink")
@TypeConverters(ViewTypeConverter::class)
data class KitchenSink(
    @PrimaryKey(autoGenerate = true)
    val id: Int,
    val view: ViewResponse
)
