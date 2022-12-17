<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\MainController;
use Illuminate\Http\Request;
use App\Models\CategoryPost;
use App\Repositories\CategoriesPostRepository;
use DB;
class CategoryController extends MainController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $catPosts = CategoryPost::all();
        return $this->sendResponse($catPosts, 'Fetch category posts successfully');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // TODO
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
	public function getDetailCate( $id ) {
        $data = array();
        $data = DB::table('category_posts') -> where('id', $id) -> first();
        return $this->sendResponse($data);
    }
}
