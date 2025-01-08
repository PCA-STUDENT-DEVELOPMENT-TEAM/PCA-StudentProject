<?php

namespace App\Exports;

use App\Models\SalaryGrade;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SalaryGradeExport implements FromCollection, WithHeadings
{
    /**
     * Return a collection of data to export.
     *
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return SalaryGrade::all(['grade', 'step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8']);
    }

    /**
     * Add headings to the Excel sheet.
     *
     * @return array
     */
    public function headings(): array
    {
        return [
            'Grade',
            'Step 1',
            'Step 2',
            'Step 3',
            'Step 4',
            'Step 5',
            'Step 6',
            'Step 7',
            'Step 8',
        ];
    }
}
