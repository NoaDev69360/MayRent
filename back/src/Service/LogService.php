<?php

namespace App\Service;

use MongoDB\Client as MongoClient;

class LogService
{
    private $mongo;

    public function __construct()
    {
        $this->mongo = new MongoClient('mongodb://mongo:27017');
    }

    public function logReservation(array $data): void
    {
        $this->mongo->mayrent->logs->insertOne([
            'type' => 'reservation',
            'data' => $data,
            'date' => new \MongoDB\BSON\UTCDateTime()
        ]);
    }
} 