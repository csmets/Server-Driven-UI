package com.example.androidapp.data.kitchensink

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [KitchenSink::class], version = 1, exportSchema = false)
abstract class KitchenSinkDatabase: RoomDatabase() {
    abstract fun kitchenSinkDao(): KitchenSinkDao

    companion object {
        @Volatile
        private var INSTANCE: KitchenSinkDatabase? = null

        fun getDatabase(context: Context): KitchenSinkDatabase{
            val tempInstance = INSTANCE
            if (tempInstance != null) {
                return tempInstance
            }
            synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    KitchenSinkDatabase::class.java,
                    "kitchen_sink_database"
                ).build()
                INSTANCE = instance
                return instance
            }
        }
    }
}