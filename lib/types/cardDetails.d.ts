export var unused: {};
export type CardDetails = {
    /**
     * -An optional override of the default card statement descriptor for a transfer. Accounts must be enabled by Moov to set this field.
     */
    dynamicDescriptor: string;
    /**
     * - Enum: [first-recurring recurring unscheduled] Describes how the card transaction was initiated
     */
    transactionSource: "first-recurring" | "recurring" | "unscheduled" | null;
};
//# sourceMappingURL=cardDetails.d.ts.map