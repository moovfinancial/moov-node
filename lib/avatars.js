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
   * Gets a binary represention of an avatar.
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
      const token = await this.moov.getToken();
      
      const result = await this.moov
          .got({
              url: `avatars/${uniqueId}`,
              method: "GET",
              headers: {
                  authorization: `Bearer ${token.token}`,
              },
          })
          .blob();

          return result;
  }
}