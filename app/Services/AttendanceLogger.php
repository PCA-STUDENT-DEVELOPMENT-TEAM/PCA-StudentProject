<?php

namespace App\Services;

use App\Libraries\ZKLibrary;
use Exception;

class AttendanceLogger
{
    protected $zk;

    public function __construct()
    {
        // Initialize ZKLibrary with IP and port from .env
        $this->zk = new ZKLibrary(env('BIOM_IP'), env('BIOM_PORT'));
    }

    public function getLog()
    {
      date_default_timezone_set("Asia/Manila");
      $t = date("Y-m-d, H:i:s");
      try {
        
        $this->zk->connect();
        $this->zk->disableDevice();
        $this->zk->testVoice();
        // $this->zk->clearAttendance();
        $this->zk->setTime($t);
        $logs = $this->zk->getAttendance();

        foreach ($logs as $log => $key) {
			  $logState = $log[2];
			  $logTime = $log[3];
        }


        $this->zk->enableDevice();
        $this->zk->disconnect();

        return $logs;

      } catch (Exception $e) {
        // Handle exceptions (e.g., connection failure)
        throw new Exception("Error connecting to biometric device: " . $e->getMessage());
      }
    }
}