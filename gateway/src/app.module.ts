import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authContext } from './auth.context';
import { AuthenticatedDataSource } from './authenticated-datasource';
import { RequestLoggingMiddleware } from './middleware/request-logger.middleware';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        context: authContext,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'project',
              url: 'http://project:3000/graphql',
            },
            { name: 'user', url: 'http://user:3000/graphql' },
            { name: 'wiki', url: 'http://wiki:3000/graphql' },
            { name: 'team', url: 'http://team:3000/graphql' },
            { name: 'issue', url: 'http://issues:3000/graphql' },
          ],
        }),
        buildService({ url }) {
          return new AuthenticatedDataSource({ url }); // Use your custom AuthenticatedDataSource here
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
