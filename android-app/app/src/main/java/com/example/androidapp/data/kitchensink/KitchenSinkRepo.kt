package com.example.androidapp.data.kitchensink

import androidx.lifecycle.LiveData

class KitchenSinkRepo(private val kitchenSinkDao: KitchenSinkDao) {

    val readAllData: LiveData<KitchenSink> = kitchenSinkDao.readData()

    suspend fun addKitchenSink(kitchenSink: KitchenSink) {
        kitchenSinkDao.addKitchenSink(kitchenSink = kitchenSink)
    }

    suspend fun deleteKitchenSink() {
        kitchenSinkDao.deleteKitchenSink()
    }
}