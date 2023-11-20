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
 * @property {string} legalBusinessName - Business's legal name
 * @property {EnrichedProfileAddress} address - Business's address
 * @property {string} email - Business's email
 * @property {EnrichedProfilePhone} phone - Business's phone
 * @property {EnrichedProfileIndustry} industryCodes - Describes industry specific identifiers
 * @property {string} website - Business's website
 *
 * @tag Enrichment
 */

/**
 * @typedef EnrichedIndividualProfile
 * @property {EnrichedProfileName} name - Individual's name
 * @property {string} email - Individual's email
 * @property {EnrichedProfileAddress} address - Individual's address
 *
 * @tag Enrichment
 */

/**
 * @typedef EnrichedProfileAddress
 * @property {string} addressLine1 - Street address
 * @property {string} addressLine2 - Unit number
 * @property {string} city - 25 characters or less
 * @property {string} stateOrProvince - 2 characters
 * @property {string} postalCode - 5 characters
 * @property {string} country - 2 characters
 *
 * @tag Enrichment
 */

/**
 * @typedef EnrichedProfileIndustry - Describes industry specific identifiers
 * @property {string} naics - North American Industry Classification System
 * @property {string} sic - Standard Industrial Classification
 *
 * @tag Enrichment
 */

/**
 * @typedef EnrichedProfileName
 * @property {string} firstName - First name
 * @property {string} middleName - Middle name
 * @property {string} lastName - Last name
 * @property {string} suffix - Suffix
 *
 * @tag Enrichment
 */

/**
 * @typedef EnrichedProfilePhone
 * @property {string} number - Phone number
 * @property {string} countryCode - Country code
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
   * The `PROFILE_ENRICHMENT_READ` scope enum is required when making a request from the browser.
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
    checkString(email).or(Err.MISSING_EMAIL);

    const result = await this.moov
      .got({
        url: "enrichment/profile",
        method: "GET",
        searchParams: {
          email: email,
        },
      })
      .json();

    return result;
  }
}
