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

    //userfeed Function return all the users on a specific condition
    public function userFeed() {
        $id = Auth::id();
        $users= user::
        where('gender',Auth::user()->interested)
        ->where('id', '!=', $id)
        ->where('invisible', '=', 0)
        ->get();

       return response()->json([
          "status" => "Success",
          "data" => $users
       ]);
    }

}
