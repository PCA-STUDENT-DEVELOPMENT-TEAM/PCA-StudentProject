<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
     // Render the homepage
     public function testingPage()
     {
         return Inertia::render('testPage'); // 'Home' corresponds to the 'Home.vue' or 'Home.tsx' in your resources/js/Pages folder
     }
}
