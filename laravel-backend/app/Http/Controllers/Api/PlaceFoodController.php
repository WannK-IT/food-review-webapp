<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\MainController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\PlaceFoodRepository;
use Illuminate\Support\Facades\DB;
use App\Models\PlaceFood;
// use Faker\Provider\Image;
// use Illuminate\Support\Facades\URL;

class PlaceFoodController extends MainController
{
    private $placeFoodRepository;

    public function __construct()
    {
        $this->placeFoodRepository = new PlaceFoodRepository;
    }

    public function getAll(){
        $data = PlaceFood::all();

        return $this->sendResponse($data);
    }

    public function addNewFoodPlace(Request $request, $user_id){

        DB::transaction(function() use($request, $user_id){
            $this->placeFoodRepository->insert($request, $user_id);
        });

        return $this->sendResponse([], 'Thêm bài viết thành công');
    }
    
    // public function uploadImagePlaceFood(Request $request){
    //     $file = $request->file('profile_img');
    //     $fileName = $file->getClientOriginalName();
    //     $file->move(public_path('public/images'), $fileName);
    //     $url = URL::to('/') . '/public/images/' . $fileName;

    //     return $this->sendResponse([$url], 'success');

    // }

}
