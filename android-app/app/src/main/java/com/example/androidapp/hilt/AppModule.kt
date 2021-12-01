package com.example.androidapp.hilt

import com.example.androidapp.signal.SignalProvider
import com.example.androidapp.signal.SignalProviderImpl
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Singleton
    @Provides
    fun provideSignalProvider(): SignalProvider {
        return SignalProviderImpl()
    }
}