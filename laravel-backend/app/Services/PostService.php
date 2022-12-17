<?php 
namespace App\Services;

class PostService{
    public function repairDataPost($dataPlaceFood, $dataPost){ 
        foreach($dataPlaceFood as $keyPlace => $valuePlace){
            $rate = 0;
            $count = 0;
            foreach($dataPost as $keyPost => $valuePost){
                if($valuePlace['id'] == $valuePost['id_food_place']){
                    $rate += $valuePost['rate'];
                    $count += 1;
                    $dataPlaceFood[$keyPlace]['rate'] = $rate;
                    $dataPlaceFood[$keyPlace]['count'] = $count;
                }
            }
        }
        return $dataPlaceFood;
    }
}
?>