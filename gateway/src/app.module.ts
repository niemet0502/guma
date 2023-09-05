import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      // server: {
      //   // ... Apollo server options
      //   cors: true,
      // },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'organization',
              url: 'http://neka-organization-1:3000/graphql',
            },
            { name: 'user', url: 'http://neka-user-1:3000/graphql' },
            { name: 'wiki', url: 'http://neka-wiki-1:3000/graphql' },
            { name: 'team', url: 'http://neka-team-1:3000/graphql' },
            { name: 'issue', url: 'http://neka-issues-1:3000/graphql' },
          ],
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
