import { check, checkString } from "./helpers/checks.js";
import { Err } from "./helpers/errors.js";

/**
 * @typedef EnrichedAddress
 * @property {string} addressLine1
 * @property {string} addressLine2
 * @property {string} city
 * @property {string} stateOrProvince
 * @property {string} postalCode
 * @property {number} entries
 * 
 * @tag Enrichment
 */

/**
 * @typedef EnrichedAddressGetCriteria
 * @property {string} search - Partial or complete address to search.
 * @property {number} [maxResults] - Optional Maximum number of results to return.
 * @property {string} [includeCities] - Optional Limits results to a list of given cities. Example: "chicago;honolulu;portland"
 * @property {string} [includeStates] - Optional Limits results to a list of given states. Example: "illinois;hawaii;oregon"
 * @property {string} [includeZipcodes] - Optional Limits results to a list of given zipcodes. Example: "60412;96818;97209"
 * @property {string} [excludeStates] - Optional Exclude list of states from results. No include pararmeters may be used with this parameter. Example: "AZ;WA;SC"
 * @property {string} [preferCities] - Optional Display results with the listed cities at the top. Example: "denver;aurora;omaha"
 * @property {string} [preferStates] - Optional Display results with the listed states at the top. Example: "CO;MN;WI"
 * @property {string} [preferZipcodes] - Optional Display results with the listed zipcodes at the top. Example: "60412;96818;97209"
 * @property {number} [preferRatio] - Optional Specifies the percentage of address suggestions that should be preferred and will appear at the top of the results.
 * @property {"none"|"city"} [preferGeolocation] - Optional If omitted or set to city it uses the sender's IP address to determine location, then automatically adds the city and state to the preferCities value. This parameter takes precedence over other include or exclude parameters meaning that if it is not set to none you may see addresses from areas you do not wish to see. Example: "city"
 * @property {string} [selected] - Optional Useful for narrowing results with addressLine2 suggestions such as Apt (denotes an apartment building with multiple residences). Example: "Apt"
 * @property {"all"|"postal"} [source] - Optional Include results from alternate data sources. Allowed values are -- all (non-postal addresses) or postal (postal addresses only).
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
   * 
   * @param {EnrichedAddressGetCriteria} criteria - Criterial for available search parameters.
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
    check(criteria).or(Err.MISSING_CRITERIA_ERROR_MESSAGE);
    checkString(criteria.search).or(Err.MISSING_ENRICH_ADDRESS_SEARCH_ERROR_MESSAGE);

    const token = await this.moov.getToken();

    const options = {
      url: "enrichment/address",
      method: "GET",
      headers: {
        authorization: `Bearer ${token.token}`,
      },
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


