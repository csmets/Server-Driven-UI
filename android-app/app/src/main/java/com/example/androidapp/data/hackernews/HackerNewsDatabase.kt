package com.example.androidapp.data.hackernews

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [HackerNews::class], version = 1, exportSchema = false)
abstract class HackerNewsDatabase: RoomDatabase() {

    abstract fun hackerNewsDao(): HackerNewsDao

    companion object {
        @Volatile
        private var INSTANCE: HackerNewsDatabase? = null

        fun getDatabase(context: Context): HackerNewsDatabase {
            val tempInstance = INSTANCE
            if (tempInstance != null) {
                return tempInstance
            }
            synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    HackerNewsDatabase::class.java,
                    "hacker_news_database"
                ).build()
                INSTANCE = instance
                return instance
            }
        }
    }
}