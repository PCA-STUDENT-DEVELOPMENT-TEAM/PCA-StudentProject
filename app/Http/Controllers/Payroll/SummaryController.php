<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SummaryController extends Controller
{
    //
    public function Summary()
    { {
            $results = DB::table('payroll_sheets as ps')
                ->join('payroll_entries as pe', 'ps.payroll_sheet_code', '=', 'pe.payroll_sheet_code')
                ->join('employees as e', 'pe.employee_code', '=', 'e.employee_code')
                ->join('applied_compensations as ac', 'e.employee_code', '=', 'ac.employee_code')
                ->join('applied_deductions as ad', 'e.employee_code', '=', 'ad.employee_code')
                ->select(
                    'ps.payroll_name',
                    'ps.start_date',
                    'ps.end_date',
                    'ps.date_paid',
                    'ac.amount as compensation',
                    'ad.amount as deduction'
                )
                ->where('e.employee_code', 1)
                ->get();


            // $NetAmount = $results[0]->compensation - $results[0]->deduction;
            $len = count($results);

            $net_amount = array_fill(0, $len, null);

            for ($i = 0; $i < $len; $i++) {
                $net_amount[$i] = $results[$i]->compensation - $results[$i]->deduction;
                // array_push($results[0][$i], $net_amount[$i]);
            }
            //>>>>>>>>???
            return Inertia::render('Payroll/Admin/PayrollsPage/PayrollsPage', [
                'data' => $results,
                'net_amount' => $net_amount
            ]);

            // json tester
            // return response()->json([
            //     'data' => $results
            // ]);
        }
    }
}
