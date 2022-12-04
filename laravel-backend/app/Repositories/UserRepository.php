<?php 
namespace App\Repositories;

use App\Models\User;

class UserRepository{
    protected $modelClass;

    public function __construct(){
        $this->modelClass = new User();
    }

    public function prepairRequestData($listRequest){
        $data['fullname'] = $listRequest->fullname;
        $data['birthday'] = $listRequest->birthday;
        $data['gender'] = $listRequest->gender;
        $data['location'] = $listRequest->location;
        $data['avatar'] = $listRequest->has('avatar') ;

        return $data;
    }

}
?>