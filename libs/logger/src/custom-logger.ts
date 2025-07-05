import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

// TODO: MAYBE USE MORE ROBUST LOGGER IN THE FUTURE LIKE Winston
@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {}
