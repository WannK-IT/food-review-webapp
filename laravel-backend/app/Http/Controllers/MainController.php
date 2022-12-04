<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;

class MainController extends Controller
{
    public function sendResponse($result, $message = null){

        // array response

        $response = [
            'success' => true,
            'data' => $result,
        ];

        if($message != null){
            $response['message'] = $message;
        }

        return response()->json($response, 200);
    }

    public function sendError($error, $errorMessages = [], $code = 404){
        // array response
        $response = [
            'success' => false,
            'message' => $error
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

}
