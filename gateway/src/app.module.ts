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
              url: 'http://localhost:5001/graphql',
            },
            { name: 'user', url: 'http://localhost:5003/graphql' },
            { name: 'wiki', url: 'http://localhost:5004/graphql' },
            { name: 'team', url: 'http://localhost:5005/graphql' },
            { name: 'issue', url: 'http://localhost:5006/graphql' },
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
