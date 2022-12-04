<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\MainController;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends MainController
{
    public function login(Request $request){
        $requestData = $request->only('email', 'password');

        $validator = Validator::make($requestData, [
            'email' => 'required|email|string',
            'password' => "required|string|min:5"
        ]);

        if($validator->fails()){
            return $this->sendError('Thông tin tài khoản không hợp lệ !', $validator->errors());
        }

        if(!Auth::attempt($requestData)){
            return $this->sendError('Thông tin đăng nhập không đúng !', []);
        }

        $user = Auth::user();
        $accessToken = $user->createToken("MyApp")->accessToken;

        return $this->sendResponse(['user' => $user, 'access_token' => $accessToken], 'Đăng nhập thành công !');
    }

    public function register(Request $request){
        $requestData = $request->all();

        $validator = Validator::make($requestData, [
            'fullname'  => 'required|string|max:30',
            'email'     => 'required|unique:users|email|string',
            'password'  => 'required|string|min:5',
        ]);

        if($validator->fails()){
            return $this->sendError('Thông tin tài khoản không hợp lệ !', $validator->errors());
        }

        $requestData['password'] = Hash::make($requestData['password']) ;
        $user = User::create($requestData);

        return $this->sendResponse($user, 'Đăng ký tài khoản thành công !');
    }

    public function logout(){
        $user = Auth::user()->token();
        $user->revoke();
        return $this->sendResponse([], 'Logged out successfully');
    }

    public function checkPassword(Request $request){
        $user = User::find($request->id);
        if(Hash::check($request->oldPassword, $user->password)){
            $user->password = Hash::make($request->confirmPassword);
            $user->save();
            return $this->sendResponse([]);
        }else{
            return $this->sendError([]);
        }      
       
    }
}
