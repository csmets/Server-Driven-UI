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
   abstract fun bindEmitSignalFactory(impl: EmitSignalFactoryImpl): EmitSignalFactory

   @Binds
   abstract fun bindSignalFactory(impl: SignalFactoryImpl): SignalFactory

   @Binds
   abstract fun bindHackerNewsResponseFactory(impl: ViewElementFactoryImpl): ViewElementFactory

   @Binds
   abstract fun bindContainerFactory(impl: ContainerFactoryImpl): ContainerFactory

   @Binds
   abstract fun bindCardFactory(impl: CardFactoryImpl): CardFactory

   @Binds
   abstract fun bindActionFactory(impl: ActionFactoryImpl): ActionFactory

   @Binds
   abstract fun bindHeadingFactory(impl: TypographyFactoryImpl): TypographyFactory

   @Binds
   abstract fun bindBoxFactory(impl: BoxFactoryImpl): BoxFactory

   @Binds
   abstract fun bindButtonFactory(impl: ButtonFactoryImpl): ButtonFactory

   @Binds
   abstract fun bindImageFactory(impl: ImageFactoryImpl): ImageFactory
}