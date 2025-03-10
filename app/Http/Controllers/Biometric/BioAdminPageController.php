<?php

namespace App\Http\Controllers\Biometrics;

use App\Http\Controllers\Controller;
use App\Models\SSLModel;
use Inertia\Inertia;
use Inertia\Response;

class BioAdminPageController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('BioAdmin/Dashboard');
    }
}
