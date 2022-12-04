<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\MainController;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Post as PostResource;
use App\Repositories\PostRepository;
use App\Repositories\CategoriesPostRepository;

class PostController extends MainController
{
    protected $postRepository;
    protected $categoryPostRepository;

    public function __construct()
    {
        $this->postRepository = new PostRepository;
        $this->categoryPostRepository = new CategoriesPostRepository;
    }

    public function index()
    {   
        $posts = $this->postRepository->getAllPost();

        return $this->sendResponse($posts);
    }

    public function store(Request $request)
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

        $post = Post::create($data);
        return $this->sendResponse(new PostResource($post));
    }


    public function show($id)
    {
        $post = Post::find($id);
        return $this->sendResponse(new PostResource($post));
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
    
    public function destroy(Post $post)
    {
        $post->delete();
        return $this->sendResponse([]);
    }

    
}
