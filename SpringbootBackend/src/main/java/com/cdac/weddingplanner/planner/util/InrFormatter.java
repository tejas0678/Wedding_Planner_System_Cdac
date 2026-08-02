package com.weddingplanner.plannerservice.util;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

/**
 * Formats amounts the way the frontend expects: an Indian-style grouped
 * number (last 3 digits, then groups of 2) prefixed with the rupee sign,
 * e.g. 765600 -> "₹7,65,600".
 */
public final class InrFormatter {

    private InrFormatter() {
    }

    public static String format(BigDecimal amount) {
        if (amount == null) {
            return "₹0";
        }
        DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.ENGLISH);
        DecimalFormat format = new DecimalFormat("##,##,##0", symbols);
        return "₹" + format.format(amount.longValue());
    }
}
