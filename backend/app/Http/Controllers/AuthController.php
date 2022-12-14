<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
    //login function with validator on the input user
    //return the created token
    public function login(Request $request){

    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Please fill all fields'], 401);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['message' => 'Incorrect email or pasword'], 401);
        }
        
        return $this->respondWithToken($token);
    }

    //register function with validator on the input user
    //return the user information
    public function register(Request $request) {
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|',
            'gender' => 'required|string|',
            'interested' => 'required|string|',
        ]);
        if($validator->stopOnFirstFailure()->fails()){
            return response()->json($validator->errors(), 401);
        }
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)],
                    ['location' =>  $this->getlocation()],
                ));
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    //logout function to delete the token
    //return logout message
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

    //function to return the user with the created token
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user'=>auth()->user()
        ]);
    }

    //getlocation function to get the location of the register user
    //return the current location
    public function getlocation(){

        $user_ip = getenv('REMOTE_ADDR');
        $geo = unserialize(file_get_contents("http://www.geoplugin.net/php.gp?ip=$user_ip"));
        $location = $geo["geoplugin_countryName"].','.$geo["geoplugin_city"];

        return $location;

    }

}