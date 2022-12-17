<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\MainController;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Post as PostResource;
use App\Models\Media;
use Illuminate\Support\Facades\DB;
use App\Repositories\PostRepository;
use App\Repositories\CategoriesPostRepository;
use App\Repositories\ReviewsRepository;
use App\Repositories\MediaRepository;
use App\Repositories\PlaceFoodRepository;


class PostController extends MainController
{
    protected $postRepository;
    protected $categoryPostRepository;
    protected $reviewRepository;
    protected $mediaRepository;
    protected $placeFoodRepository;

    public function __construct()
    {
        $this->postRepository = new PostRepository;
        $this->categoryPostRepository = new CategoriesPostRepository;
        $this->reviewRepository = new ReviewsRepository;
        $this->mediaRepository = new MediaRepository;
        $this->placeFoodRepository = new PlaceFoodRepository;
    }

    public function index()
    {   
        $posts = $this->postRepository->getAllPost();

        return $this->sendResponse($posts);
    }

    public function insert(Request $request){
        $data = $request->all();
        $result = DB::transaction(function () use ($data) {
            $idPost = $this->postRepository->insertPost($data);
            $this->reviewRepository->insertReview($data, $idPost);
            $this->mediaRepository->insertMedia($data, $idPost);
            return $idPost;
        });
        return $this->sendResponse($result, 'Add Success');
    }


    public function getPostById($id)
    {
        $post = $this->postRepository->getPostById($id);
        $countPlace =  $this->postRepository->countPlace($post[0]['place_food_id']);
        $sumPlace =  $this->postRepository->sumPlace($post[0]['place_food_id']);
        $post[0]['place_food_countPlace'] = $countPlace;
        $post[0]['place_food_ratePlace'] = round(($sumPlace / $countPlace)*2) / 2;
        return $this->sendResponse($post);
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'title' => 'required',
            'content' => 'required',
            'vote' => 'required|integer',
            'rate' => 'required|numeric',
        ]);

        if($validator->fails()){
            return $this->sendError('Fail to validate data', $validator->errors());
        }

        $post->update($data);
        return $this->sendResponse(new PostResource($post));
    }

    public function getAllCategoriesPost(){
        $data = $this->categoryPostRepository->getAllCategories();
        return $this->sendResponse($data);
    }

    public function getPostMapCategory($category_id){
        $dataPosts = $this->postRepository->getPostMapCategory($category_id);
        $dataCategory = $this->categoryPostRepository->getCategoryById($category_id);
        $result['data_category'] = $dataCategory;
        if(!empty($dataPosts)){
            $result['data_posts'] = $dataPosts;
        }
        return $this->sendResponse($result);
    }
    
    public function destroy(Post $post)
    {
        $post->delete();
        return $this->sendResponse([]);
    }

    public function getListPostAndUser( $id ) {
        $data = array();
        if( $id != 0 ) $data = DB::table('posts') 
            -> join('users','posts.id_user','=','users.id') 
            //-> join('medias', 'posts.id', '=', 'medias.id_post')
            -> select('posts.*', 'users.id as userid', 'users.avatar', 'users.fullname') 
            -> where('id_cat_post', $id) 
            -> get();
    
        else $data = DB::table('users') -> join('posts','posts.id_user','=','users.id') -> get();
        foreach($data as $key => $value) {
            $img = DB::table('medias') -> where( 'id_post', $value->id ) -> first();
            $data[$key]->url = $img->title;        
        };
        return $this->sendResponse($data);
    }
	
    public function getListPostByUser( $id ) {
        $data = array();
        $data = DB::table('posts') 
            -> join('users','posts.id_user','=','users.id') 
            -> select('posts.*', 'users.id as userid', 'users.avatar', 'users.fullname') 
            -> where('id_user', $id) 
            -> get();
    
        foreach($data as $key => $value) {
            $img = DB::table('medias') -> where( 'id_post', $value->id ) -> first();
            $data[$key]->url = $img->title;        
        };
        return $this->sendResponse($data);
    }
    public function getDetailPost( $id ) {
        $data = array();
        $data = DB::table('posts') 
                -> join('users','posts.id_user','=','users.id')
                -> join('place_foods', 'posts.id_food_place', '=', 'place_foods.id') 
                -> select('posts.*', 'place_foods.place_name', 'users.id as userid', 'users.avatar', 'users.fullname', 'users.email')
                -> where('posts.id', $id) -> first();
        return $this->sendResponse($data);
    }
    public function getRelatePost( $id ) {
        $data = array();
        $data = DB::table('posts')
                -> join('users','posts.id_user','=','users.id') 
                -> select('posts.*', 'users.id as userid', 'users.avatar', 'users.fullname') 
                -> where('posts.id', '<>', $id)
                -> limit(4) -> get();
        foreach( $data as $key => $value ) {
            $img = DB::table('medias') -> where( 'id_post', $value->id ) -> first();
            $data[$key]->url = $img->title;        
        };
        return $this->sendResponse($data);
    }
    public function countPostByCate(){
        $data = array();
        $data = DB::table('posts') 
                -> join('category_posts', 'posts.id_cat_post','=','category_posts.id')
                //-> select(DB::raw('count(posts.id) as count_post, category_posts.category_name')) 
                -> select('category_posts.category_name', 'category_posts.id', 'category_posts.image',DB::raw('count(posts.id) as count'))
                -> groupBy('category_posts.category_name', 'category_posts.id', "category_posts.image" )
                -> get();
        return $this->sendResponse($data);
    }
     public function countPostByUser( $id ){
        $data = array();
        $data = DB::table('posts') -> selectRaw('count(id) as count_post') -> where('id_user', $id) -> first();
        return $this->sendResponse($data);
    }
    public function getListImage( $id ) {
        $data = array();
        $data = DB::table('medias') -> where('id_post', $id) -> get();
        return $this->sendResponse($data);
    }
    public function getListImageByUser( $id ) {
        $data = array();
        $data = DB::table('medias')
                -> join( 'posts', 'posts.id', '=', 'medias.id_post' ) 
                -> select( 'medias.title as url', 'medias.id' )
                -> where('posts.id_user', $id) -> get();
        return $this->sendResponse($data);
    }
    public function saveComment (Request $request)
    {
        $data = array();
        $data['comment'] = $request -> comment;
        $data['id_post'] = $request -> id;
        $data['id_user'] = $request -> userId;
        $data['updated_at'] = NOW();
        $data['created_at'] = NOW();
        $validator = Validator::make($data, [
            'comment' => 'required',
            'id_post' => 'required',
            'id_user' => 'required',
        ]);
        if( $validator->fails() ){
            return $this->sendError('Fail to validate data', $validator->errors());
        }
        $result = DB::table('comments') -> insert($data);
        if( $result ) $message = 'Thành công' ;
        else $message = 'Thất bại';
        return $this->sendResponse($data, $message);
    }

    public function getListCommnet( $id ) {
        $data = array();
        $data = DB::table('comments')
                -> join( 'posts', 'posts.id', '=', 'comments.id_post' ) 
                -> select( 'comments.*', 'posts.id as postid' )
                -> where('posts.id', $id) -> get();
        return $this->sendResponse($data);
    }

    public function getAllMediaByUserId($user_id){
        $data = Post::where("id_user", $user_id)->get()->toArray();
        $result = collect($data)->map(function ($item){
            return $item['id'];
        });
        $dataMedia = Media::whereIn("id_post", $result)->get();
        return $this->sendResponse($dataMedia);
    }

    public function getAllPostByUserId($user_id){
        $data = Post::join('place_foods', 'posts.id_food_place', 'place_foods.id')
        ->join('medias', 'medias.id_post', 'posts.id')
        ->where('posts.id_user', $user_id)
        ->select('posts.*', 'medias.title AS media_title')
        ->selectRaw("DATE_FORMAT(posts.created_at, '%d/%m/%Y %H:%i:%s') AS post_created_at")
        ->get();

        return $this->sendResponse($data);
    }
  
}
