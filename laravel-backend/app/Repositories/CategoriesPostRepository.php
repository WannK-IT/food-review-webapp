<?php 
namespace App\Repositories;

use App\Models\CategoryPost;

class CategoriesPostRepository{
    protected $modelClass;

    public function __construct(){
        $this->modelClass = new CategoryPost();
    }

    public function getAllCategories(){
        $data = $this->modelClass::where('status', 'active')
        ->select("id", "category_name")
        ->get();

        return $data;
    }
    
}
?>