package com.example.androidapp.hilt

import com.example.androidapp.models.factories.*
import com.example.androidapp.signals.SignalProvider
import com.example.androidapp.signals.SignalProviderImpl
import com.example.androidapp.signals.SignalRegistry
import com.example.androidapp.signals.SignalRegistryImpl
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

@Module
@InstallIn(SingletonComponent::class)
abstract class AppModule {
   @Binds
   abstract fun bindSignalProvider(impl: SignalProviderImpl): SignalProvider

   @Binds
   abstract fun bindSignalRegistry(impl: SignalRegistryImpl): SignalRegistry

   @Binds
   abstract fun bindColumnLayoutFactory(impl: ColumnLayoutFactoryImpl): ColumnLayoutFactory

   @Binds
   abstract fun bindEmitSignalFactory(impl: EmitSignalFactoryImpl): EmitSignalFactory

   @Binds
   abstract fun bindFeedContainerElementFactory(impl: FeedContainerElementFactoryImpl): FeedContainerElementFactory

   @Binds
   abstract fun bindFeedFavouriteFactory(impl: FeedFavouriteFactoryImpl): FeedFavouriteFactory

   @Binds
   abstract fun bindFeedHeadingFactory(impl: FeedHeadingFactoryImpl): FeedHeadingFactory

   @Binds
   abstract fun bindFeedItemFactory(impl: FeedItemFactoryImpl): FeedItemFactory

   @Binds
   abstract fun bindFeedResponseFactory(impl: FeedResponseFactoryImpl): FeedResponseFactory

   @Binds
   abstract fun bindParagraphFactory(impl: ParagraphFactoryImpl): ParagraphFactory

   @Binds
   abstract fun bindSignalFactory(impl: SignalFactoryImpl): SignalFactory

   @Binds
   abstract fun bindTypographyContentFactory(impl: TypographyContentFactoryImpl): TypographyContentFactory

   @Binds
   abstract fun bindHackerNewsResponseFactory(impl: HackerNewsResponseFactoryImpl): HackerNewsResponseFactory

   @Binds
   abstract fun bindContainerFactory(impl: ContainerFactoryImpl): ContainerFactory

   @Binds
   abstract fun bindCardFactory(impl: CardFactoryImpl): CardFactory

   @Binds
   abstract fun bindActionFactory(impl: ActionFactoryImpl): ActionFactory

   @Binds
   abstract fun bindHeadingFactory(impl: HeadingFactoryImpl): HeadingFactory
}