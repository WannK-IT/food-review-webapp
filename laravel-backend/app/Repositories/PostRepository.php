<?php 
namespace App\Repositories;

use App\Models\Post;

class PostRepository{
    protected $modelClass;

    public function __construct(){
        $this->modelClass = new Post();
    }

    public function getAllPost(){
        
        $data = $this->modelClass::join("users", "posts.id_user", "users.id")
                ->join("medias", "posts.id", "medias.id_post")
                ->select("posts.*", "users.fullname", "users.avatar", "medias.title AS image_food")
                ->orderBy("posts.id", "DESC")
                ->get();
                
        return $data;
    }
}
?>