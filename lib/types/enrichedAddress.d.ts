/**
 * @typedef EnrichedAddress
 * @property {string} addressLine1
 * @property {string} addressLine2
 * @property {string} city
 * @property {string} stateOrProvince
 * @property {string} postalCode
 * @property {number} entries
 *
 * @tag EnrichedAddresses
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
 * @tag EnrichedAddresses
 * */
/**
 * The Enriched Address API.
 * @tag EnrichedAddresses
 */
export class EnrichedAddresses {
    constructor(moov: any);
    /**
     * @type {Moov}
     * @private
     */
    private moov;
    /**
     * Gets enriched address suggestions.
     *
     * @param {EnrichedAddressGetCriteria} criteria - Criterial for available search parameters.
     * @returns {Promise<EnrichedAddress[]>}
     * @tag EnrichedAddresses
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
    get(criteria: EnrichedAddressGetCriteria): Promise<EnrichedAddress[]>;
}
export type EnrichedAddress = {
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    entries: number;
};
export type EnrichedAddressGetCriteria = {
    /**
     * - Partial or complete address to search.
     */
    search: string;
    /**
     * - Optional Maximum number of results to return.
     */
    maxResults?: number;
    /**
     * - Optional Limits results to a list of given cities. Example: "chicago;honolulu;portland"
     */
    includeCities?: string;
    /**
     * - Optional Limits results to a list of given states. Example: "illinois;hawaii;oregon"
     */
    includeStates?: string;
    /**
     * - Optional Limits results to a list of given zipcodes. Example: "60412;96818;97209"
     */
    includeZipcodes?: string;
    /**
     * - Optional Exclude list of states from results. No include pararmeters may be used with this parameter. Example: "AZ;WA;SC"
     */
    excludeStates?: string;
    /**
     * - Optional Display results with the listed cities at the top. Example: "denver;aurora;omaha"
     */
    preferCities?: string;
    /**
     * - Optional Display results with the listed states at the top. Example: "CO;MN;WI"
     */
    preferStates?: string;
    /**
     * - Optional Display results with the listed zipcodes at the top. Example: "60412;96818;97209"
     */
    preferZipcodes?: string;
    /**
     * - Optional Specifies the percentage of address suggestions that should be preferred and will appear at the top of the results.
     */
    preferRatio?: number;
    /**
     * - Optional If omitted or set to city it uses the sender's IP address to determine location, then automatically adds the city and state to the preferCities value. This parameter takes precedence over other include or exclude parameters meaning that if it is not set to none you may see addresses from areas you do not wish to see. Example: "city"
     */
    preferGeolocation?: "none" | "city";
    /**
     * - Optional Useful for narrowing results with addressLine2 suggestions such as Apt (denotes an apartment building with multiple residences). Example: "Apt"
     */
    selected?: string;
    /**
     * - Optional Include results from alternate data sources. Allowed values are -- all (non-postal addresses) or postal (postal addresses only).
     */
    source?: "all" | "postal";
};
//# sourceMappingURL=enrichedAddress.d.ts.map