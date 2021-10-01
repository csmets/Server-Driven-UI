package com.example.androidapp.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase


@Database(entities = [Feed::class], version = 1, exportSchema = false)
abstract class FeedDatabase: RoomDatabase() {

    abstract fun feedDao(): FeedDao

    companion object {
        @Volatile
        private var INSTANCE: FeedDatabase? = null

        fun getDatabase(context: Context): FeedDatabase {
            val tempInstance = INSTANCE
            if (tempInstance != null) {
                return tempInstance
            }
            synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    FeedDatabase::class.java,
                    "feed_database"
                ).build()
                INSTANCE = instance
                return instance
            }
        }
    }
}