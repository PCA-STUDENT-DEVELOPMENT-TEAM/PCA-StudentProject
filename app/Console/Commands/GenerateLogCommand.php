<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Libraries\ZKLibrary;
use App\Models\DailyTimeEntry;
use App\Models\Employee;
use DateTime;
use Exception;


class GenerateLogCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add logs from the device to db';
    protected $zk;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->zk = new ZKLibrary(env('BIOM_IP'), env('BIOM_PORT'));

        $currentDate = date('Y-m-d');
        $recentDate = DailyTimeEntry::latest()->first()->date ?? null;

        /* Checking if today matches the most recent DTR entry */
        if ($recentDate == $currentDate) {
            return;
        }

        // date_default_timezone_set("Asia/Manila");
        // $t = date("Y-m-d, H:i:s");

        try {
            $this->zk->connect();
            $this->zk->disableDevice();
            // $this->zk->setTime($t);


            // Fetch all logs from the device
            $logs = $this->zk->getAttendance();

            // to simplify specific calculations and to avoid some bugs
            usort($logs, function ($a,$b)
            {
                return strtotime($a[3]) - strtotime($b[3]);
            });

            // Time range boundaries
            // Force time boundaries to have the same date
            $morningStart = (new DateTime('08:00:00'));
            $morningEnd = (new DateTime('12:00:00'));
            $afternoonStart = (new DateTime('13:00:00'));
            $afternoonEnd = (new DateTime('17:00:00'));

            foreach ($logs as $log) {
                try {
                    // Extract log details
                    $device_bio_id = $log[1];
                    $logDateTime = new DateTime($log[3]); // Full date and time
                    $logDate = $logDateTime->format('Y-m-d');
                    $logTime = new DateTime($logDateTime->format('H:i:s'));
                    
                    // needs to be change cuz redundant, soon.
                    $logTime->setDate($logDateTime->format('Y'), $logDateTime->format('m'), $logDateTime->format('d')); // for time comparison
                    $morningStart->setDate($logDateTime->format('Y'), $logDateTime->format('m'), $logDateTime->format('d'));
                    $morningEnd->setDate($logDateTime->format('Y'), $logDateTime->format('m'), $logDateTime->format('d'));
                    $afternoonStart->setDate($logDateTime->format('Y'), $logDateTime->format('m'), $logDateTime->format('d'));
                    $afternoonEnd->setDate($logDateTime->format('Y'), $logDateTime->format('m'), $logDateTime->format('d'));

                    $logType = $log[2]; // 0, 1, 4, 5

                    // Find the employee by number
                    $employee = Employee::where('device_bio_id', $device_bio_id)->first();
                    if (!$employee) {
                        throw new Exception("Employee with device bio id: {$device_bio_id} not found.");
                    }

                    // Find or create the time entry for this employee on this date
                    $timeEntry = DailyTimeEntry::firstOrNew([
                        'date' => $logDate,
                        'employee_code' => $employee->employee_code,
                    ]);

                    // Initialize if new entry
                    // if (!$timeEntry->exists) {
                    //     $timeEntry->work_minutes = 0;
                    //     $timeEntry->overtime_minutes = 0;
                    // }

                    // For calculations
                    $tardyMins = 0;
                    $undertimeMins = 0;

                    // Determine the field to update based on the log type and time
                    if (in_array($logType, [0])) { // Time in
                        if ($logTime >= $morningStart && $logTime <= $morningEnd) {
                            $timeEntry->time_in_am = $logTime->format('H:i:s');
                            $timeDiff = $morningStart->diff($logTime);
                            $tardyMins += $timeDiff->h * 60 + $timeDiff->i;
                            $timeEntry->tardy_minutes = $tardyMins;
                            
                        } elseif ($logTime >= $afternoonStart && $logTime <= $afternoonEnd) {
                            $timeEntry->time_in_pm = $logTime->format('H:i:s');
                            $timeDiff = $afternoonStart->diff($logTime);
                            $tardyMins += $timeDiff->h * 60 + $timeDiff->i;
                            $timeEntry->tardy_minutes += $tardyMins;
                        }
                    } elseif (in_array($logType, [1])) { // Time out
                        if ($logTime >= $morningStart && $logTime <= $morningEnd) {
                            $timeEntry->time_out_am = $logTime->format('H:i:s');
                            $timeDiff = $logTime->diff($morningEnd);
                            $undertimeMins += $timeDiff->h * 60 + $timeDiff->i;
                            $timeEntry->undertime_minutes = $undertimeMins;

                        } elseif ($logTime >= $afternoonStart && $logTime <= $afternoonEnd) {
                            $timeEntry->time_out_pm = $logTime->format('H:i:s');
                            $timeDiff = $logTime->diff($afternoonEnd);
                            $undertimeMins += $timeDiff->h * 60 + $timeDiff->i;
                            $timeEntry->undertime_minutes += $undertimeMins;
                        }
                    } elseif (in_array($logType,[4]))
                    {
                        $timeEntry->overtime_in = $logTime->format('H:i:s');
                    } elseif (in_array($logType, [5])) {
                        $timeEntry->overtime_out = $logTime->format('H:i:s');
                    }

                    $workMins = 0;
                    $overtimeMins = 0;
                    if ($timeEntry->time_in_am && $timeEntry->time_out_am) {
                        $timeInAM = new DateTime($timeEntry->time_in_am);
                        $timeOutAM = new DateTime($timeEntry->time_out_am);
                        $morningWorkTime = $timeInAM->diff($timeOutAM);
                        $workMins += $morningWorkTime->h * 60 + $morningWorkTime->i;
                        // dd($morningWorkTime);
                    }
            
                    if ($timeEntry->time_in_pm && $timeEntry->time_out_pm) {
                        $timeInPM = new DateTime($timeEntry->time_in_pm);
                        $timeOutPM = new DateTime($timeEntry->time_out_pm);
                        $afternoonWorkTime = $timeInPM->diff($timeOutPM);
                        $workMins += $afternoonWorkTime->h * 60 + $afternoonWorkTime->i;
                    }
            
                    // Calculate overtime
                    if ($timeEntry->overtime_in && $timeEntry->overtime_out){
                        $overtimeIn = new DateTime($timeEntry->overtime_in);
                        $overtimeOut = new DateTime($timeEntry->overtime_out);
                        $overtimeDiff = $overtimeIn->diff($overtimeOut);
                        $overtimeMins += $overtimeDiff-> h * 60 + $overtimeDiff->i;
                    }
            
                    $timeEntry->work_minutes = $workMins;
                    $timeEntry->overtime_minutes = $overtimeMins;

                    // Save the time entry
                    $timeEntry->save();
                } catch (Exception $e) {
                    echo "Error processing log entry: " . $e->getMessage() . "\n";
                    continue;
                }
            }
            $this->zk->enableDevice();
            $this->zk->disconnect();
        } catch (Exception $e) {
            // Handle connection or device-related errors
            echo "Device error: " . $e->getMessage() . "\n";
        }

        return;
    }
}
