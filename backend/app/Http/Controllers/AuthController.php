<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
public function register(Request $request)
{
    $fields = $request->validate([
        'name' => 'required|string',
        'email' => 'required|string|email|unique:users,email',
        'password' => 'required|string|confirmed',
        'role' => 'string|in:user,coach'
    ]);

    $user = User::create([
        'name' => $fields['name'],
        'email' => $fields['email'],
        'password' => bcrypt($fields['password']),
        'role' => $fields['role'] ?? 'user',
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'access_token' => $token,
        'token_type' => 'Bearer',
        'message' => 'User registered successfully'
    ], 201);
}


    public function login(Request $request)
    {
        // Validation des données de connexion
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Tentative d'authentification
        if (!Auth::attempt($fields)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

$user = User::where('email', $fields['email'])->first();

        // Génération du token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'message' => 'User logged in successfully'
        ]);
    }

    public function logout(Request $request)
    {
        // Révoque tous les tokens de l'utilisateur authentifié
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out']);
    }
}
