import { RemoteGraphQLDataSource } from '@apollo/gateway';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set(
      'user',
      context.user ? JSON.stringify(context.user) : null,
    );
  }
}
