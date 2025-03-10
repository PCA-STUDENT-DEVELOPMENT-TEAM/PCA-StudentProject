<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DateTime;
use App\Libraries\ZKLibrary;


class BiometricDeviceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:biometric';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set time';
    protected $zk;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        date_default_timezone_set("Asia/Manila");
        $t = date("Y-m-d, H:i:s");
        $this->zk = new ZKLibrary(env('BIOM_IP'), env('BIOM_PORT'));
        $this->zk->connect();
        $this->zk->disabledevice();
        $this->zk->setTime(now()->format("Y-m-d, H:i:s"));
        // $this->zk->setTime($t);
        $this->zk->enableDevice();
        $this->zk->disconnect();
    }
}
