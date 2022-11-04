package com.example.androidapp.components.kitchensink

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.androidapp.KITCHEN_SINK_TEMPLATE_ENDPOINT
import com.example.androidapp.data.kitchensink.KitchenSink
import com.example.androidapp.data.kitchensink.KitchenSinkDatabase
import com.example.androidapp.data.kitchensink.KitchenSinkRepo
import com.example.androidapp.models.factories.ViewElementFactory
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.launch
import org.json.JSONArray
import javax.inject.Inject

@HiltViewModel
class KitchenSinkViewModel @Inject constructor(
    @ApplicationContext context: Context,
    private val viewElementFactory: ViewElementFactory
): ViewModel() {
    private val _kc = MutableLiveData<KitchenSink>()
    val sink: LiveData<KitchenSink> = _kc

    private val repo: KitchenSinkRepo

    init {
        val kcDao = KitchenSinkDatabase.getDatabase(context).kitchenSinkDao()
        repo = KitchenSinkRepo(kcDao)
        _kc.value = repo.readAllData.value
        val queue = Volley.newRequestQueue(context)
        val url = KITCHEN_SINK_TEMPLATE_ENDPOINT

        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                val json = JSONArray(response)
                if (json.length() > 0) {
                    val kcData = json
                        .getJSONObject(0)
                        .getJSONObject("data")
                    val kcResponse = KitchenSink(0, viewElementFactory.create(kcData))
                    _kc.postValue(kcResponse)

                    viewModelScope.launch {
                        repo.deleteKitchenSink()
                        repo.addKitchenSink(kcResponse)
                    }
                }
            },
            { print("Failed to get kitchen sink response") }
        )
        queue.add(stringRequest)
    }
}