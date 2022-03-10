import { checkString } from "./helpers/checks.js";
import { Err } from "./helpers/errors.js";

/**
 * @typedef EnrichedProfile
 * @property {EnrichedIndividualProfile} individual - Describes a person
 * @property {EnrichedBusinessProfile} business - Describes a company
 * 
 * @tag Enrichment
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
 * @tag Enrichment
 */

/**
 * @typedef EnrichedIndividualProfile
 * @property {EnrichedProfileName} name
 * @property {string} email
 * @property {EnrichedProfileAddress} address
 * 
 * @tag Enrichment
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
 * @tag Enrichment
 */

/**
 * @typedef EnrichedProfileIndustry - Describes industry specific identifiers
 * @property {string} naics
 * @property {string} sic
 * 
 * @tag Enrichment
 */

/**
 * @typedef EnrichedProfileName
 * @property {string} firstName
 * @property {string} middleName
 * @property {string} lastName
 * @property {string} suffix
 * 
 * @tag Enrichment
 */

/**
 * @typedef EnrichedProfilePhone
 * @property {string} number
 * @property {string} countryCode
 * 
 * @tag Enrichment
 */


/**
 * The Enriched Profile API.
 * @tag Enrichment
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
   * @tag Enrichment
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