package com.example.androidapp.data.kitchensink

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query

@Dao
interface KitchenSinkDao {
    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun addKitchenSink(kitchenSink: KitchenSink)

    @Query("SELECT * FROM kitchen_sink")
    fun readData(): LiveData<KitchenSink>

    @Query("DELETE FROM kitchen_sink")
    suspend fun deleteKitchenSink()
}