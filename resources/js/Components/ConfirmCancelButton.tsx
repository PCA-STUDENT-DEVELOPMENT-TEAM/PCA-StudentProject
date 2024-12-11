import { Button } from "./ui/button";

export default function ({
    setOpenDialog,
    processing,
}: {
    setOpenDialog: any;
    processing: any;
}) {
    return (
        <div>
            <div className="bottom-0 right-0 fixed flex p-5 gap-5">
                <Button
                    className="mt-5 w-full min-w-32"
                    type="button"
                    onClick={() => setOpenDialog(false)}
                    variant="ghost"
                >
                    Cancel
                </Button>
                <Button
                    className="mt-5 w-full min-w-32"
                    disabled={processing}
                    type="submit"
                >
                    Confirm
                </Button>
            </div>
        </div>
    );
}
