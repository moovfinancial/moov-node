import { check, checkString } from "./helpers/checks.js";
import { Err } from "./helpers/errors.js";

/**
 * @typedef EnrichedAddress
 * @property {string} addressLine1 - Street address
 * @property {string} addressLine2 - Unit number
 * @property {string} city - 25 characters or less
 * @property {string} stateOrProvince - 2 characters
 * @property {string} postalCode - 5 characters
 * @property {number} entries - The number of addresses matching the search criteria
 *
 * @tag Enrichment
 */

/**
 * @typedef EnrichedAddressGetCriteria
 * @property {string} search - Partial or complete address to search
 * @property {number} [maxResults] - Optional Maximum number of results to return
 * @property {string} [includeCities] - Optional - Limits results to a list of given cities (example, "chicago;honolulu;portland")
 * @property {string} [includeStates] - Optional - Limits results to a list of given states (example, "illinois;hawaii;oregon")
 * @property {string} [includeZipcodes] - Optional - Limits results to a list of given ZIP codes (example, "60412;96818;97209")
 * @property {string} [excludeStates] - Optional - Exclude list of states from results. No include parameters may be used with this parameter. Example: "AZ;WA;SC"
 * @property {string} [preferCities] - Optional-  Display results with the listed cities at the top (example, "denver;aurora;omaha")
 * @property {string} [preferStates] - Optional - Display results with the listed states at the top (example, "CO;MN;WI")
 * @property {string} [preferZipcodes] - Optional - Display results with the listed ZIP codes at the top (example, "60412;96818;97209")
 * @property {number} [preferRatio] - Optional - Specifies the percentage of address suggestions that should be preferred and will appear at the top of the results
 * @property {"none"|"city"} [preferGeolocation] - Optional - If omitted or set to city it uses the sender's IP address to determine location, then automatically adds the city and state to the preferCities value (example: "city"). This parameter takes precedence over other include or exclude parameters meaning that if it is not set to none you may see addresses from areas you do not wish to see.
 * @property {string} [selected] - Optional - Useful for narrowing results with `addressLine2` suggestions such as Apt. Denotes an apartment building with multiple residences (example, "Apt").
 * @property {"all"|"postal"} [source] - Optional - Include results from alternate data sources. Allowed values are `all` (non-postal addresses) or `postal` (postal addresses only).
 *
 * @tag Enrichment
 * */

/**
 * The Enriched Address API.
 * @tag Enrichment
 */
export class EnrichedAddresses {
  constructor(moov) {
    /**
     * @type {Moov}
     * @private
     */
    this.moov = moov;
  }

  /**
   * Gets enriched address suggestions.
   * The `PROFILE_ENRICHMENT_READ` scope enum is required when making a request from the browser.
   * 
   * @param {EnrichedAddressGetCriteria} criteria - Criteria for available search parameters
   * @returns {Promise<EnrichedAddress[]>}
   * @tag Enrichment
   *
   * @example
   * const moov = new Moov(...);
   * try {
   *   const suggestedAddresses = moov.enrichedAddresses.get({
   *     search: "123 Fake St",
   *     includeCities: "Springfield"
   *     // ...
   *   });
   * } catch (err) {
   *   // ...
   * }
   */
  async get(criteria) {
    check(criteria).or(Err.MISSING_CRITERIA);
    checkString(criteria.search).or(Err.MISSING_ENRICH_ADDRESS_SEARCH);

    const options = {
      url: "enrichment/address",
      method: "GET",
    };

    if (criteria) {
      const params = new URLSearchParams();

      if (criteria.search) {
        params.append("search", criteria.search);
      }
      if (criteria.maxResults) {
        params.append("maxResults", criteria.maxResults.toString());
      }
      if (criteria.includeCities) {
        params.append("includeCities", criteria.includeCities);
      }
      if (criteria.includeStates) {
        params.append("includeStates", criteria.includeStates);
      }
      if (criteria.includeZipcodes) {
        params.append("includeZipcodes", criteria.includeZipcodes);
      }
      if (criteria.excludeStates) {
        params.append("excludeStates", criteria.excludeStates);
      }
      if (criteria.preferCities) {
        params.append("preferCities", criteria.preferCities);
      }
      if (criteria.preferStates) {
        params.append("preferStates", criteria.preferStates);
      }
      if (criteria.preferZipcodes) {
        params.append("preferZipcodes", criteria.preferZipcodes);
      }
      if (criteria.preferRatio) {
        params.append("preferRatio", criteria.preferRatio.toString());
      }
      if (criteria.preferGeolocation) {
        params.append("preferGeolocation", criteria.preferGeolocation);
      }
      if (criteria.selected) {
        params.append("selected", criteria.selected);
      }
      if (criteria.source) {
        params.append("source", criteria.source);
      }

      options.searchParams = params;
    }

    const result = await this.moov.got(options).json();

    return result;
  }
}
