import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";

const useCheckbox = <Tchecked extends Record<string, CheckedState | undefined>>(
    initialState: Tchecked = {} as Tchecked
) => {
    const [checkbox, setState] = useState<Tchecked>(initialState);

    function setCheckbox(
        checkboxName: keyof Tchecked,
        value: CheckedState | undefined
    ) {
        setState((prevState) => ({
            ...prevState,
            [checkboxName]: value,
        }));
    }

    return { checkbox, setCheckbox };
};

export default useCheckbox;
