<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Libraries\ZKLibrary;
use DateTime;

class TestingCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    protected $zk;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->zk = new ZKLibrary(env('BIOM_IP'), env('BIOM_PORT'));
        $this->zk->connect();
        $this->zk->disableDevice();
        // // $users_data = $this->zk->getUser();
        // // dump($users_data);
        // // dd($this->zk->getUser());
        $logs = $this->zk->getAttendance();
        usort($logs, function ($a,$b)
        {
            return strtotime($a[3]) - strtotime($b[3]);
        });
        dd($logs);
        $this->zk->enableDevice();
        $this->zk->disconnect();
    }
}
