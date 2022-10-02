<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

class landingController extends Controller
{
    //userProfile Function return the user information
    public function userProfile() {
        return response()->json(auth()->user());
    }

}
