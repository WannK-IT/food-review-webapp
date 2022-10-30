<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\MainController;
use App\Models\Post;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Post as PostResource;

class PostController extends MainController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $posts = DB::table("posts")
            ->join("users", "posts.id_user", "=", "users.id")
            ->join("medias", "posts.id", "=", "medias.id_post")
            ->select("posts.*", "users.fullname", "users.avatar", "medias.title AS image_food")
            ->orderBy("posts.id", "DESC")
            ->get();

        return $this->sendResponse($posts, 'Fetch posts successfully');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
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
        return $this->sendResponse(new PostResource($post), 'Create post successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $post = Post::find($id);
        return $this->sendResponse(new PostResource($post), 'Retrieved data successfully');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
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
        return $this->sendResponse(new PostResource($post), 'Update post successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return $this->sendResponse([], 'Delete post successfully');
    }

    
}
