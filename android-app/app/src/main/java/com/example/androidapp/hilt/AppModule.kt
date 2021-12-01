package com.example.androidapp.hilt

import com.example.androidapp.components.feed.FeedFavouriteViewModel
import com.example.androidapp.signal.SignalProvider
import com.example.androidapp.signal.SignalProviderImpl
import dagger.Binds
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.components.ViewComponent
import dagger.hilt.android.components.ViewModelComponent
import dagger.hilt.android.scopes.ViewModelScoped
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(ViewComponent::class)
object AppModule {

    @Singleton
    @Provides
    fun provideSignalProvider(): SignalProvider {
        return SignalProviderImpl()
    }

    @Provides
    fun provideFeedFavouriteViewModel(signalProvider: SignalProvider): FeedFavouriteViewModel {
        return FeedFavouriteViewModel(signalProvider)
    }
}