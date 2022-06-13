import { Injectable, Logger, HttpStatus, HttpException } from "@nestjs/common";
import * as vidchain from "../api/vidchain";
import { Presentation, MsgPresentationReady } from "../interfaces/dtos";
import { strB64dec } from "../utils/Util";

@Injectable()
export class PresentationsService {
  private readonly logger = new Logger(PresentationsService.name);

  /**
   * Request Verifiable presentation
   * An authorization token is requested and it is used to request a Verifiable Presentation
   */
  async handleRequest(body: MsgPresentationReady): Promise<any> {
    const token = await vidchain.getAuthzToken();
    const response = await vidchain.requestVP(
      token,
      JSON.parse(JSON.stringify(body))
    );
    this.logger.debug("requestVP done successfully");
  }

  /**
   * Handle callback return presentation
   * An authorization token is requested and it is used to request a Presentation retrieval and validate it
   */
  async handlePresentation(body: MsgPresentationReady): Promise<any> {
    try {
      const token = await vidchain.getAuthzToken();
      const presentation: Presentation = await vidchain.retrievePresentation(
        token,
        body.url
      );
      this.logger.debug(
        "Presentation retrieved: " + JSON.stringify(presentation)
      );
      const validation: boolean = await this.validatePresentation(
        token,
        presentation
      );
      if (validation) {
        this.logger.debug(
          "Presentation has just been checked. Presentation validation: done."
        );
        return presentation;
      }
      return validation;
    } catch (e) {
      this.throwErrorMessage("");
    }
  }

  /**
   *  Validates retrieved presentation
   */
  async validatePresentation(token: string, presentation: Presentation) {
    /**
     * Despite the API validates the Credential Type, and the wallet filters by type of requested credential too, at this point, the backend could even perform its own extra validations. For instance:
     * const credentialType = await this.customValidationCredentialType(presentation);
     * For testing purposes, in this example, this const is simply set to true.
     */
    const validation = await vidchain.validateVP(token, strB64dec(presentation.data.decrypted));
    this.logger.debug("Validation of VP: " + validation);
    return validation;
  }

  throwErrorMessage(message: string) {
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
