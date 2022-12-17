<?php 
namespace App\Repositories;

use App\Models\Media;

class MediaRepository{
    protected $modelClass;

    public function __construct(){
        $this->modelClass = new Media();
    }

    public function insertMedia($data, $idPost){
        $this->modelClass->title = $data['image'];
        $this->modelClass->id_post = $idPost;

        $this->modelClass->save();
    }

}
?>