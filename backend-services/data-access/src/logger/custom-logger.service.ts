import { Injectable, Scope } from '@nestjs/common';
import { context, trace } from '@opentelemetry/api';
import pino from 'pino';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger {
  private logger = pino();
  private context: string;

  /**
   * Set the context for the logger.
   */
  setContext(context: string) {
    this.context = context;
    this.logger = this.logger.child({ context });
  }

  /**
   * Write a log at the specified level.
   */
  private logAtLevel(
    level: string,
    content: any,
    methodName?: string,
    ...optionalParams: any[]
  ) {
    const currentSpan = trace.getSpan(context.active());
    const traceId = currentSpan?.spanContext().traceId;
    const spanId = currentSpan?.spanContext().spanId;

    this.logger[level]({
      datetime: new Date().toISOString(),
      content,
      methodName,
      traceId: traceId ? traceId : undefined,
      spanId: spanId ? spanId : undefined,
      ...optionalParams,
    });
  }

  /**
   * Write a 'log' level log.
   */
  log(content: any, methodName?: string, ...optionalParams: any[]) {
    this.logAtLevel('info', content, methodName, ...optionalParams);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(content: any, methodName?: string, ...optionalParams: any[]) {
    this.logAtLevel('fatal', content, methodName, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(content: any, methodName?: string, ...optionalParams: any[]) {
    this.logAtLevel('error', content, methodName, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(content: any, methodName?: string, ...optionalParams: any[]) {
    this.logAtLevel('warn', content, methodName, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(content: any, methodName?: string, ...optionalParams: any[]) {
    this.logAtLevel('debug', content, methodName, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(content: any, methodName?: string, ...optionalParams: any[]) {
    this.logAtLevel('verbose', content, methodName, ...optionalParams);
  }
}
