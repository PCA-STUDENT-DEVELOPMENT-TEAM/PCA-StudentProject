import { useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

type FormattedDateRange = { from: string | null; to: string | null };

export function useDateRange(
    initialRange: DateRange | null = null
) {
    // Handle the case when initialRange is null
    const formattedInitialRange: FormattedDateRange = initialRange
        ? {
            from: format(initialRange.from!, "yyyy-MM-dd"),
            to: format(initialRange.to!, "yyyy-MM-dd"),
        }
        : { from: null, to: null };

    // Use formatted range in state
    const [dateRange, setDateRange] = useState<FormattedDateRange>(formattedInitialRange);

    return { dateRange, setDateRange };
}
