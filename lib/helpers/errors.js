export const Err = {
  // Parameter errors
  ApiKeyCredentials: "credentials are required",
  AccountID: "accountID is required",
  CardID: "cardID is required",
  PublicKey: "publicKey is required",
  SecretKey: "secretKey is required",
  Domain: "domain is required and must be a valid URL",
  Scopes: "one or more scopes are required",
  MISSING_ACCOUNT_ID_ERROR_MESSAGE: "Please provide an accountID",
  MISSING_BANK_PAYLOAD: "Please provide a bankAccount, plaidToken, or mxAuthorizationCode.",
  MISSING_BANK_ACCOUNT_NUMBER_ERROR_MESSAGE: "Please provide a bank account number.",
  MISSING_BANK_ACCOUNT_ROUTING_NUMBER_ERROR_MESSAGE: "Please provide a routingNumber.",
  MISSING_BANK_ACCOUNT_ROUTING_NUMBER_LENGTH_ERROR_MESSAGE: "Routing number must be 9 digits.",
  MISSING_BANK_ACCOUNT_HOLDER_NAME_ERROR_MESSAGE: "Please provide a holderName.",
  MISSING_BANK_ACCOUNT_HOLDER_TYPE_ERROR_MESSAGE: "Please provide a holderType.",
  MISSING_CRITERIA_ERROR_MESSAGE: "Please provide search criteria.",
  MISSING_EMAIL_ERROR_MESSAGE: "Please provide an email.",
  MISSING_ENRICH_ADDRESS_SEARCH_ERROR_MESSAGE: "Please provide a partial or complete address to search.",
  MISSING_INSTITUTION_NAME_OR_ROUTING_ERROR_MESSAGE: "Please provide a financial institution's name or routing number to search."
};
