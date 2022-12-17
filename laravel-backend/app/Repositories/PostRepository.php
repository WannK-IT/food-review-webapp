<?php 
namespace App\Repositories;

use App\Models\Post;

class PostRepository{
    protected $modelClass;

    public function __construct(){
        $this->modelClass = new Post();
    }

    public function getAllPost(){
        
        $data = $this->modelClass::join("medias", "medias.id_post", "posts.id")
                ->join("users", "users.id", "posts.id_user")
                ->select("posts.id", "posts.title", "posts.vote", "posts.id_user", "medias.title AS image", "users.fullname", "users.avatar", "posts.id_food_place")
                ->get();
                
        return $data->toArray();
    }

    public function getPostById($idPost){
        $data = $this->modelClass::join("medias", "medias.id_post", "posts.id")
                ->join("users", "users.id", "posts.id_user")
                ->join("place_foods", "posts.id_food_place", "place_foods.id")
                ->join("reviews", "reviews.id_post", "posts.id")
                ->where('posts.id', $idPost)
                ->select(
                    "posts.id AS post_id",
                    "posts.title AS post_title",
                    "posts.content AS post_content",
                    "posts.vote AS post_vote",
                    "posts.rate AS post_rate",
                    "posts.id_cat_post AS post_id_cat_post",
                    "medias.title AS image_post",
                    "posts.id AS post_id",
                    "users.id AS user_id",
                    "users.fullname AS user_fullname",
                    "users.avatar AS user_avatar",
                    "place_foods.id as place_food_id",
                    "place_foods.place_name as place_food_name",
                    "place_foods.address as place_food_address",
                    "place_foods.city as place_food_city",
                    "place_foods.avatar as place_food_avatar",
                    "place_foods.time_open as place_food_time_open",
                    "place_foods.time_close as place_food_time_close",
                    "reviews.hygiene AS review_hygiene",
                    "reviews.price AS review_price",
                    "reviews.taste AS review_taste",
                    "reviews.space AS review_space",
                    "reviews.service AS review_service",
                    )
                ->selectRaw("DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i:%s') AS post_created_at")
                ->get();
                
        return $data->toArray();
    }

    public function getPostByListIdPlaceFood($listID){
        $data = $this->modelClass::whereIn("id_food_place", $listID)->get();
        return $data->toArray();
    }

    public function insertPost($data){
        $this->modelClass->title = $data['title'];
        $this->modelClass->content = $data['content'];
        $this->modelClass->vote = $data['vote'];
        
        $this->modelClass->id_cat_post = $data['id_cat_post'];
        $this->modelClass->id_food_place = $data['id_food_place'];
        $this->modelClass->id_user = $data['id_user'];
        $this->modelClass->rate = $this->calculateRate($data['rate']);
        $this->modelClass->save();

        return $this->modelClass->id;
    }

    public function countPlace($idPlace){
        $data = $this->modelClass::where("id_food_place", $idPlace)->selectRaw("COUNT(id_food_place) AS countPlace")->get();
        return $data[0]['countPlace'];
    }

    public function sumPlace($idPlace){
        $data = $this->modelClass::where("id_food_place", $idPlace)->selectRaw("SUM(rate) AS sumPlace")->get();
        return $data[0]['sumPlace'];
    }

    public function calculateRate($data){
        $sum = collect($data)->sum();
        $result = round(($sum / 5)*2) / 2;
        return $result;
    }

    public function getPostMapCategory($id_category){
        $data = $this->modelClass::join("category_posts", "category_posts.id", "posts.id_cat_post")
        ->join("medias", "medias.id_post", "posts.id")
        ->where("posts.id_cat_post", $id_category)
        ->select("posts.*", "category_posts.id AS category_id", "category_posts.category_name", "category_posts.image AS category_image", "medias.title AS post_image")
        ->get();

        return $data;
    }

}
?>