import { Module } from "@nestjs/common";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { PresentationsController } from "./presentations/presentations.controller";
import { PresentationsService } from "./presentations/presentations.service";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [EventsModule],
  controllers: [UsersController, PresentationsController, AuthController],
  providers: [UsersService, PresentationsService, AuthService],
})
export class AppModule {}
