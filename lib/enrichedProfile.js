import { check } from "./helpers/checks";

/**
 * @typedef EnrichedProfile
 * @property {EnrichedIndividualProfile} individual - Describes a person
 * @property {EnrichedBusinessProfile} business - Describes a company
 * 
 * @tag EnrichedProfiles
 */

/**
 * @typedef EnrichedBusinessProfile
 * @property {string} legalBusinessName
 * @property {EnrichedProfileAddress} address
 * @property {string} email
 * @property {EnrichedProfilePhone} phone
 * @property {EnrichedProfileIndustry} industryCodes - Describes industry specific identifiers
 * @property {string} website
 * 
 * @tag EnrichedProfiles
 */

/**
 * @typedef EnrichedIndividualProfile
 * @property {EnrichedProfileName} name
 * @property {string} email
 * @property {EnrichedProfileAddress} address
 * 
 * @tag EnrichedProfiles
 */

/**
 * @typedef EnrichedProfileAddress
 * @property {string} addressLine1
 * @property {string} addressLine2
 * @property {string} city
 * @property {string} stateOrProvince
 * @property {string} postalCode
 * @property {country} country
 * 
 * @tag EnrichedProfiles
 */

/**
 * @typedef EnrichedProfileIndustry - Describes industry specific identifiers
 * @property {string} naics
 * @property {string} sic
 * 
 * @tag EnrichedProfiles
 */

/**
 * @typedef EnrichedProfileName
 * @property {string} firstName
 * @property {string} middleName
 * @property {string} lastName
 * @property {string} suffix
 * 
 * @tag EnrichedProfiles
 */

/**
 * @typedef EnrichedProfilePhone
 * @property {string} number
 * @property {string} countryCode
 * 
 * @tag EnrichedProfiles
 */


/**
 * The Enriched Profile API.
 * @tag EnrichedProfiles
 */
export class EnrichedProfiles {
  constructor(moov) {
    /**
     * @type {Moov}
     * @private
     */
    this.moov = moov;
  }

  /**
   * Gets enriched profile data.
   *
   * @param {string} email - Email address associated with the profile.
   * @returns {Promise<EnrichedProfile>}
   * @tag EnrichedProfiles
   * 
   * @example
   * const moov = new Moov(...);
   * try {
   *   const enrichedProfile = moov.enrichedProfiles.get("employee@business.com");
   * } catch (err) {
   *   // ..
   * }
   */
  async get(email) {
    checkString(email).or(Err.MISSING_EMAIL_ERROR_MESSAGE);

    const token = await this.moov.getToken();

    const result = await this.moov
      .got({
        url: "enrichment/profile",
        method: "GET",
        headers: {
          authorization: `Bearer ${token.token}`,
        },
        searchParams: {
          email: email
        }
      })
      .json();

    return result;
  }
}