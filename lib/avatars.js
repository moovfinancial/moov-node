import { checkString } from "./helpers/checks.js";
import { Err } from "./helpers/errors.js";

/**
 * The Avatars API.
 * @tag Avatars
 */
export class Avatars {
  constructor(moov) {
    /**
     * @type {Moov}
     * @private
     */
    this.moov = moov;
  }

  /**
   * Gets a binary representation of an avatar.
   * The `PROFILE_ENRICHMENT_READ` scope enum is required when making a request from the browser.
   *
   * @param {string} uniqueId - Any unique ID associated with an account such as AccountID, RepresentativeID, Routing Number, or User ID
   * @returns {Promise<Blob>} - Binary representation of the avatar.
   * @tag Avatars
   *
   * @example
   * const moov = new Moov(...);
   * try {
   *   const avatar = await moov.avatars.get("...");
   * } catch (err) {
   *   // ...
   * }
   */
  async get(uniqueId) {
    checkString(uniqueId).or(Err.MISSING_UNIQUE_ID);

    const result = await this.moov
      .got({
        url: `avatars/${uniqueId}`,
        method: "GET",
      })
      .blob();

    return result;
  }
}
