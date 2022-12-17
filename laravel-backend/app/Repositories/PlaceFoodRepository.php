<?php 
namespace App\Repositories;

use App\Models\PlaceFood;

class PlaceFoodRepository{
    protected $modelClass;

    public function __construct(){
        $this->modelClass = new PlaceFood();
    }

    public function insert($request, $user_id){
        $this->modelClass->place_name = $request->place_name;
        $this->modelClass->address = $request->address;
        $this->modelClass->city = $request->city;
        $this->modelClass->time_open = $request->time_open;
        $this->modelClass->time_close = $request->time_close;
        $this->modelClass->phone = $request->phone;
        $this->modelClass->low_price = $request->low_price;
        $this->modelClass->high_price = $request->high_price;
        $this->modelClass->id_user = $user_id;
        if(!empty($request->avatar)){
            $this->modelClass->avatar = $request->avatar;
        }
        $this->modelClass->save();

    }
}
?>