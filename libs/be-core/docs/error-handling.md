# Error Handling System

This document outlines the error handling system implemented in the be-core library.

## Custom Error Classes

We have implemented a hierarchy of custom error classes to handle various types of errors in our application:

- `BaseAppError`: The base class for all custom errors.
- `ValidationError` (E001): For input validation errors.
- `DatabaseError` (E002): For database-related errors.
- `AuthenticationError` (E003): For authentication failures.
- `AuthorizationError` (E004): For authorization failures.
- `NotFoundError` (E005): For resource not found errors.
- `ConflictError` (E006): For conflicts in operations (e.g., duplicate entries).
- `InternalServerError` (E007): For unexpected server errors.
- `InvalidEmailError` (E008): For invalid email format.

## Global Exception Filter

The `AllExceptionsFilter` catches all unhandled exceptions in the application and formats them into a consistent error response structure.

## Logging

The `LoggingService` is used to log errors and other important information throughout the application.

1. Always use custom error classes when throwing errors in the application.

   ```typescript
   // Good
   throw new NotFoundError('User not found');

   // Avoid
   throw new Error('User not found');
   ```

2. Include meaningful error messages that can help in debugging but don't expose sensitive information.

   ```typescript
   // Good
   throw new DatabaseError('Failed to insert user');

   // Avoid
   throw new DatabaseError('SQL error: INSERT INTO users (email, password) VALUES ...');
   ```

3. Log errors appropriately using the `LoggingService`.

   ```typescript
   import { LoggingService } from './services/logging.service';

   @Injectable()
   export class UserService {
     constructor(private logger: LoggingService) {}

     async createUser(userData: UserDto) {
       try {
         // User creation logic...
       } catch (error) {
         this.logger.error('Failed to create user', error.stack);
         throw new DatabaseError('Failed to create user');
       }
     }
   }
   ```

4. Use specific error types to allow for more granular error handling in the client.

   ```typescript
   async function handleUserCreation(userData: UserDto) {
     try {
       const user = await userService.createUser(userData);
       return user;
     } catch (error) {
       if (error instanceof ValidationError) {
         // Handle validation errors
       } else if (error instanceof DatabaseError) {
         // Handle database errors
       } else {
         // Handle other types of errors
       }
     }
   }
   ```

5. Extend custom error classes for more specific errors when needed.

   ```typescript
   export class UserNotFoundError extends NotFoundError {
     constructor(userId: string) {
       super(`User with ID ${userId} not found`);
       this.name = 'UserNotFoundError';
     }
   }
   ```

6. Use the `ErrorResponseDto` when creating error responses manually (though this should be rare due to the global exception filter).

   ```typescript
   import { ErrorResponseDto } from './dtos/error-response.dto';

   const errorResponse = new ErrorResponseDto(
     404,
     'User not found',
     'E005',
     new Date().toISOString(),
     '/api/users/123'
   );
   ```

7. When adding new error types, ensure they are documented here with their corresponding error codes.

8. Regularly review and update error codes and messages to ensure they remain relevant and helpful.

9. Use environment variables or configuration files to control the verbosity of error messages in different environments (e.g., more detailed in development, less detailed in production).

10. Implement proper error handling in GraphQL resolvers:

    ```typescript
    @Resolver()
    export class UserResolver {
      @Query(() => User)
      async user(@Args('id') id: string) {
        try {
          const user = await this.userService.findById(id);
          if (!user) {
            throw new UserNotFoundError(id);
          }
          return user;
        } catch (error) {
          // Log the error
          this.logger.error(`Failed to fetch user with id ${id}`, error.stack);
          
          // Rethrow the error to be handled by the global exception filter
          throw error;
        }
      }
    }
    ```

By following these best practices, you can ensure a consistent and robust error handling system throughout your application.
