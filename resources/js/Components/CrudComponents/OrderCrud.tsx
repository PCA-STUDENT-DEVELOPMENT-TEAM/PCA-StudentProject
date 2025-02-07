import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "../InputError";
import { Button } from "../ui/button";

export function OrderStore({ openDialog, formType }: { openDialog: any, formType: "leave" | "travel" }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    // Common fields (could be shared across forms)
    employee_code: "",

    // Fields for Leave Request
    leave_request_type: "",
    date_filed: "",
    leave_request_status: "",

    // Fields for Travel Order
    start_date: "",
    end_date: "",
    travel_order_type: "",
    venuedestination: "",
    travel_order_status: "",
  });
  const submit: FormEventHandler = (e) => {
    e.preventDefault();

  };

  return (
    <div>
      <form onSubmit={submit}>
        {/* Header Section */}


        {/* Conditional Rendering of Fields Based on formType */}
        {formType === "leave" ? (
          // Leave Request Fields
          <>
            <div>
              <Label
                htmlFor="employee_code"
                className={errors.employee_code ? "text-red-600" : ""}
              >
                Employee ID
              </Label>
              <Input
                id="employee_code"
                type="text"
                value={data.employee_code}
                onChange={(e) => setData("employee_code", e.target.value)}
              />
              <InputError message={errors.employee_code} className="mt-2" />
            </div>

            <div>
              <Label
                htmlFor="leave_request_type"
                className={errors.leave_request_type ? "text-red-600" : ""}
              >
                Leave Request Type
              </Label>
              <Input
                id="leave_request_type"
                type="text"
                value={data.leave_request_type}
                onChange={(e) => setData("leave_request_type", e.target.value)}
              />
              <InputError message={errors.leave_request_type} className="mt-2" />
            </div>

            <div>
              <Label
                htmlFor="date_filed"
                className={errors.date_filed ? "text-red-600" : ""}
              >
                Date Filed
              </Label>
              <Input
                id="date_filed"
                type="date"
                value={data.date_filed}
                onChange={(e) => setData("date_filed", e.target.value)}
              />
              <InputError message={errors.date_filed} className="mt-2" />
            </div>

            <div>
              <Label
                htmlFor="leave_request_status"
                className={errors.leave_request_status ? "text-red-600" : ""}
              >
                Leave Request Status
              </Label>
              <Input
                id="leave_request_status"
                type="text"
                value={data.leave_request_status}
                onChange={(e) => setData("leave_request_status", e.target.value)}
              />
              <InputError message={errors.leave_request_status} className="mt-2" />
            </div>
          </>
        ) : (
          // Travel Order Fields
          <>
            <div>
              <Label
                htmlFor="employee_code"
                className={errors.employee_code ? "text-red-600" : ""}
              >
                Employee ID
              </Label>
              <Input
                id="employee_code"
                type="text"
                value={data.employee_code}
                onChange={(e) => setData("employee_code", e.target.value)}
              />
              <InputError message={errors.employee_code} className="mt-2" />
            </div>

            <div>
              <Label
                htmlFor="start_date"
                className={errors.start_date ? "text-red-600" : ""}
              >
                Start Date
              </Label>
              <Input
                id="start_date"
                type="date"
                value={data.start_date}
                onChange={(e) => setData("start_date", e.target.value)}
              />
              <InputError message={errors.start_date} className="mt-2" />
            </div>

            <div>
              <Label
                htmlFor="end_date"
                className={errors.end_date ? "text-red-600" : ""}
              >
                End Date
              </Label>
              <Input
                id="end_date"
                type="date"
                value={data.end_date}
                onChange={(e) => setData("end_date", e.target.value)}
              />
              <InputError message={errors.end_date} className="mt-2" />
            </div>

            <div>
              <Label
                htmlFor="travel_order_type"
                className={errors.travel_order_type ? "text-red-600" : ""}
              >
                Travel Order Type
              </Label>
              <Input
                id="travel_order_type"
                type="text"
                value={data.travel_order_type}
                onChange={(e) => setData("travel_order_type", e.target.value)}
              />
              <InputError message={errors.travel_order_type} className="mt-2" />
            </div>

            <div>
              <Label
                htmlFor="venuedestination"
                className={errors.venuedestination ? "text-red-600" : ""}
              >
                Venue/Destination
              </Label>
              <Input
                id="venuedestination"
                type="text"
                value={data.venuedestination}
                onChange={(e) => setData("venuedestination", e.target.value)}
              />
              <InputError message={errors.venuedestination} className="mt-2" />
            </div>

            <div>
              <Label
                htmlFor="travel_order_status"
                className={errors.travel_order_status ? "text-red-600" : ""}
              >
                Travel Order Status
              </Label>
              <Input
                id="travel_order_status"
                type="text"
                value={data.travel_order_status}
                onChange={(e) => setData("travel_order_status", e.target.value)}
              />
              <InputError message={errors.travel_order_status} className="mt-2" />
            </div>
          </>
        )}

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between gap-3">

          <Button
            variant="destructive"
            className="mt-5 w-full"
            type="button"
            onClick={() => {
              reset();
              openDialog(false); // Close dialog
            }}
          >
            Cancel
          </Button>
          <Button className="mt-5 w-full" type="submit" disabled={processing}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export function OrderUpdate({ RowData }: { RowData: any }) {

}

export function OrderRead({ RowData }: { RowData: any }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    employee_code: RowData?.employee_code || "",
    leave_request_type: RowData?.leave_request_type || "",
    date_filed: RowData?.date_filed || "",
    leave_request_status: RowData?.leave_request_status || "",
    start_date: RowData?.start_date || "",
    end_date: RowData?.end_date || "",
    travel_order_type: RowData?.travel_order_type || "",
    venuedestination: RowData?.venuedestination || "",
    travel_order_status: RowData?.travel_order_status || "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

  };

  return (
    <div>

      <form onSubmit={submit}>

      
        {RowData.employee_code && (
          <div>
            <Label htmlFor="empl" className={errors.employee_code && "text-red-600"}>
              Employee ID
            </Label>
            <Input
              id="employee_code"
              type="string"
              value={data.employee_code}

            />
            <InputError message={errors.employee_code} className="mt-2" />
          </div>
        )}


        {RowData.leave_request_type && (
          <>
            <div>
              <Label htmlFor="leave_request_type" className={errors.leave_request_type && "text-red-600"}>
                Leave Type
              </Label>
              <Input
                id="leave_request_type"
                type="string"
                value={data.leave_request_type}
                onChange={(e) => setData("leave_request_type", e.target.value)}
              />
              <InputError message={errors.leave_request_type} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="date_filed" className={errors.date_filed && "text-red-600"}>
                Applied On
              </Label>
              <Input
                id="date_filed"
                type="string"
                value={data.date_filed}
                onChange={(e) => setData("date_filed", e.target.value)}
              />
              <InputError message={errors.date_filed} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="leave_request_status" className={errors.leave_request_status && "text-red-600"}>
                Leave Status
              </Label>
              <Input
                id="leave_request_status"
                type="string"
                value={data.leave_request_status}
                onChange={(e) => setData("leave_request_status", e.target.value)}
              />
              <InputError message={errors.leave_request_status} className="mt-2" />
            </div>
          </>
        )}

        {/* Conditionally Render Travel Order Fields */}
        {RowData.start_date && !RowData.leave_request_type && (
          <>
            <div>
              <Label htmlFor="start_date" className={errors.start_date && "text-red-600"}>
                Start Date
              </Label>
              <Input
                id="start_date"
                type="string"
                value={data.start_date}
                onChange={(e) => setData("start_date", e.target.value)}
              />
              <InputError message={errors.start_date} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="end_date" className={errors.end_date && "text-red-600"}>
                End Date
              </Label>
              <Input
                id="end_date"
                type="string"
                value={data.end_date}
                onChange={(e) => setData("end_date", e.target.value)}
              />
              <InputError message={errors.end_date} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="travel_order_type" className={errors.travel_order_type && "text-red-600"}>
                Travel Order Type
              </Label>
              <Input
                id="travel_order_type"
                type="string"
                value={data.travel_order_type}
                onChange={(e) => setData("travel_order_type", e.target.value)}
              />
              <InputError message={errors.travel_order_type} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="venuedestination" className={errors.venuedestination && "text-red-600"}>
                Venue/Destination
              </Label>
              <Input
                id="venuedestination"
                type="string"
                value={data.venuedestination}
                onChange={(e) => setData("venuedestination", e.target.value)}
              />
              <InputError message={errors.venuedestination} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="travel_order_status" className={errors.travel_order_status && "text-red-600"}>
                Travel Order Status
              </Label>
              <Input
                id="travel_order_status"
                type="string"
                value={data.travel_order_status}
                onChange={(e) => setData("travel_order_status", e.target.value)}
              />
              <InputError message={errors.travel_order_status} className="mt-2" />
            </div>
          </>
        )}

        <Button className="mt-5 w-full" type="submit" disabled={processing}>
          Submit
        </Button>
        <Button
          className="mt-5 w-full"
          type="button"
          onClick={() => {
            reset();
          }}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}