import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  HttpStatus,
  Param,
  Put
} from "@nestjs/common";
import { Response } from "express";
import { UsersService } from "./users.service";
import { SocketClient, SessionClient, SessionData } from "../interfaces/dtos";

@Controller("demo/universitybackend/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   *  Store socket clientId -  did pair in a database
   */
  @Post("")
  async register(
    @Body() body: SocketClient,
    @Res() res: Response
  ): Promise<Response<any>> {
    const result = await this.usersService.createUser(body);
    return res.status(HttpStatus.CREATED).send(result);
  }
  @Post("sessions")
  async registerSession(
    @Body() body: SessionClient,
    @Res() res: Response
  ): Promise<Response<any>> {
    const result = await this.usersService.createSession(body);
    return res.status(HttpStatus.CREATED).send(result);
  }

  @Put("sessions")
  async editSession(
    @Body() body: SessionData,
    @Res() res: Response
  ): Promise<Response<any>> {
    const result = await this.usersService.editSession(body);
    return res.status(HttpStatus.CREATED).send(result);
  }
  /**s
   *  Retrieve from database socket clientId
   */
  @Get(":did")
  async getUser(@Param() params, @Res() res: Response): Promise<Response<any>> {
    const result = await this.usersService.getUser(params.did);
    return res.status(HttpStatus.OK).send(result);
  }

   /**
   *  Retrieve from database data of the session
   */
  @Get(":sessionId")
  async getSession(@Param() params, @Res() res: Response): Promise<Response<any>> {
    const result = await this.usersService.getSession(params.sessionId);
    return res.status(HttpStatus.OK).send(result);
  }

}
