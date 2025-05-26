<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserDashboardController extends Controller
{
    public function index()
{
    return response()->json(['message' => 'Bienvenue dans le dashboard User']);
}
}
