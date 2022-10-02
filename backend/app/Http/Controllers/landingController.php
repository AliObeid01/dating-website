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

    //updateProfile Function to update user profile
    public function updateProfile(Request $request) {
        $id = Auth::id();
        $user = user::find($id);
        $user->name = $request->name;
        $user->interested = $request->interested;
        $user->bio = $request->bio;
        $user->dob = $request->dob;
        $user->invisible = $request->invisible;
        $url=$id.'.'.$request->profile_pic->extension();
        $request->profile_pic->move(public_path('images'),$url);
        $user->profile_pic=$url;

        if($user->save()){
           return response()->json([
             "status" => "Success",
             "message" => "Profile updated"
           ]);
        }

       return response()->json([
          "status" => "Error",
          "data" => "Error editing profile"
        ]);

    }

    //favoriteUser Function to favorite a user
    public function favoriteUser(Request $request) {
        $id = Auth::id();
        $user = user::find($id);
        $user->favorites()->attach($request->favorite_id);

        return response()->json([
            "status" => "Success",
            "data" => "user has been favorite"
        ]);
    }

    //UnfavoriteUser Function to unfavorite a user
    public function UnfavoriteUser(Request $request) {
        $id = Auth::id();
        $user = user::find($id);
        $user->favorites()->detach($request->favorite_id);

        return response()->json([
            "status" => "Success",
            "data" => "user has been Unfavorite"
        ]);
    }

    //getfavorites Function to get the favorites of a user
    public function getfavorites(Request $request) {
        $id = Auth::id();
        $user = user::find($id);
        return $user->favorites()->get();
    }

    //getfavorites Function to get the favoriteby users
    public function getFavoriteBy(Request $request) {
        $id = Auth::id();
        $user = user::find($id);
        return $user->favoriteBy()->get();
    }   



}
