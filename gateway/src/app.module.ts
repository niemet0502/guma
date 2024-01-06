import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authContext } from './auth.context';
import { AuthenticatedDataSource } from './authenticated-datasource';

@Module({
  imports: [
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
              name: 'organization',
              url: 'http://organization:3000/graphql',
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
export class AppModule {}
