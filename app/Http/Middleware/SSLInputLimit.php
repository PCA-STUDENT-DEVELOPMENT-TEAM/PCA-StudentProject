<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SSLInputLimit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $minLimit = 0;
        $maxLimit = 724775807; // Set your maximum limit here
        
        // Check if the request inputs are within the limits
        foreach (['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8'] as $step) {
            if ($request->has($step)) {
                if ($request->$step < $minLimit || $request->$step > $maxLimit) {
                    return redirect()->back()->withErrors(["please try again"]);
                }
            }
        }
        return $next($request);
    }
}
