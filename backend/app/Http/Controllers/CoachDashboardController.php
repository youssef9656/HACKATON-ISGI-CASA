<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CoachDashboardController extends Controller
{
    public function index()
{
    return response()->json(['message' => 'Bienvenue dans le dashboard Coach']);
}
}
