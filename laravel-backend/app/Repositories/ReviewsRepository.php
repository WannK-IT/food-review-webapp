<?php 
namespace App\Repositories;

use App\Models\Review;

class ReviewsRepository{
    protected $modelClass;

    public function __construct(){
        $this->modelClass = new Review();
    }

    public function insertReview($data, $idPost){
        $this->modelClass->hygiene = $data['rate']['hygiene'];
        $this->modelClass->price = $data['rate']['price'];
        $this->modelClass->service = $data['rate']['service'];
        $this->modelClass->taste = $data['rate']['taste'];
        $this->modelClass->space = $data['rate']['space'];
        $this->modelClass->id_post = $idPost;

        $this->modelClass->save();
    }

}
?>