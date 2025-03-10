<?php

use App\Console\Commands\BiometricDeviceCommand;
use App\Console\Commands\GenerateLogCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Schedule::command(BiometricDeviceCommand::class)->everyFiveMinutes();
Schedule::command(GenerateLogCommand::class)->everySecond();
